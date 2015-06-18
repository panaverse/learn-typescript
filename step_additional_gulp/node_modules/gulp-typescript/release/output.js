///<reference path='../typings/tsd.d.ts'/>
var path = require('path');
var ts = require('typescript');
var sourceMap = require('source-map');
var gutil = require('gulp-util');
var utils = require('./utils');
var tsApi = require('./tsapi');
(function (OutputFileKind) {
    OutputFileKind[OutputFileKind["JavaScript"] = 0] = "JavaScript";
    OutputFileKind[OutputFileKind["SourceMap"] = 1] = "SourceMap";
    OutputFileKind[OutputFileKind["Definitions"] = 2] = "Definitions";
})(exports.OutputFileKind || (exports.OutputFileKind = {}));
var OutputFileKind = exports.OutputFileKind;
var Output = (function () {
    function Output(_project, streamJs, streamDts) {
        this.files = {};
        this.errors = [];
        this.project = _project;
        this.streamJs = streamJs;
        this.streamDts = streamDts;
    }
    Output.prototype.write = function (fileName, content) {
        var _a = utils.splitExtension(fileName, Output.knownExtensions), fileNameExtensionless = _a[0], extension = _a[1];
        var kind;
        switch (extension) {
            case 'js':
                kind = OutputFileKind.JavaScript;
                break;
            case 'js.map':
                kind = OutputFileKind.SourceMap;
                break;
            case 'd.ts':
                kind = OutputFileKind.Definitions;
                break;
        }
        this.addOrMergeFile(fileNameExtensionless, kind, content);
    };
    /**
     * Adds the file to the `this.files`.
     * If there is already a file with the specified `fileName`, it will be merged.
     * This method should be called 3 times, 1 time for each `OutputFileKind`.
     * @param fileName The extensionless filename.
     */
    Output.prototype.addOrMergeFile = function (fileName, kind, content) {
        var _this = this;
        var file = this.files[fileName];
        if (file) {
            file.content[kind] = content;
            if (file.content[OutputFileKind.JavaScript] !== undefined
                && file.content[OutputFileKind.SourceMap] !== undefined
                && (file.content[OutputFileKind.Definitions] !== undefined || !this.project.options.declaration)) {
                file.sourceMap = JSON.parse(file.content[OutputFileKind.SourceMap]);
                if (!this.project.compiler.correctSourceMap(file.sourceMap)) {
                    file.skipPush = true;
                    return;
                }
                if (this.project.singleOutput) {
                    file.original = this.project.input.firstSourceFile;
                    file.sourceMapOrigins = this.project.input.getFileNames(true).map(function (fName) { return _this.project.input.getFile(fName); });
                }
                else {
                    var originalFileName = path.resolve(file.sourceMap.sourceRoot, file.sourceMap.sources[0]);
                    file.original = this.project.input.getFile(originalFileName);
                    if (!file.original) {
                        console.error(("Could not find input file " + originalFileName + ". This is probably an issue of gulp-typescript.")
                            + "\nPlease report it at https://github.com/ivogabe/gulp-typescript/issues"
                            + ("\nDebug information: \nsourceRoot = " + JSON.stringify(file.sourceMap.sourceRoot) + "\nsources = " + JSON.stringify(file.sourceMap.sources)));
                        file.skipPush = true;
                        file.sourceMapOrigins = [];
                    }
                    else {
                        file.skipPush = !file.original.gulp;
                        file.sourceMapOrigins = [file.original];
                    }
                }
                this.applySourceMaps(file);
                if (!this.project.sortOutput) {
                    this.emit(file);
                }
            }
            return;
        }
        this.files[fileName] = {
            fileName: fileName,
            original: undefined,
            sourceMapOrigins: undefined,
            content: (_a = {},
                _a[kind] = content,
                _a
            ),
            pushed: false,
            skipPush: undefined,
            sourceMapsApplied: false,
            sourceMap: undefined,
            sourceMapString: undefined
        };
        var _a;
    };
    Output.prototype.applySourceMaps = function (file) {
        if (file.sourceMapsApplied || file.skipPush || !file.original.gulp.sourceMap)
            return;
        file.sourceMapsApplied = true;
        var map = file.sourceMap;
        map.file = map.file.replace(/\\/g, '/');
        delete map.sourceRoot;
        map.sources = map.sources.map(function (path) { return path.replace(/\\/g, '/'); });
        var generator = sourceMap.SourceMapGenerator.fromSourceMap(new sourceMap.SourceMapConsumer(map));
        for (var _i = 0, _a = file.sourceMapOrigins; _i < _a.length; _i++) {
            var sourceFile = _a[_i];
            if (!sourceFile || !sourceFile.gulp || !sourceFile.gulp.sourceMap)
                continue;
            var inputOriginalMap = sourceFile.gulp.sourceMap;
            var inputMap = typeof inputOriginalMap === 'object' ? inputOriginalMap : JSON.parse(inputOriginalMap);
            var consumer = new sourceMap.SourceMapConsumer(inputMap);
            generator.applySourceMap(consumer);
            if (!inputMap.sources || !inputMap.sourcesContent)
                continue;
            for (var i in inputMap.sources) {
                generator.setSourceContent(inputMap.sources[i], inputMap.sourcesContent[i]);
            }
        }
        file.sourceMapString = generator.toString();
    };
    Output.prototype.emit = function (file) {
        if (file.skipPush)
            return;
        var root;
        if (this.project.singleOutput) {
            root = file.original.gulp.base;
        }
        else if (this.project.options.outDir !== undefined) {
            root = file.original.gulp.cwd + '/';
        }
        else {
            root = '';
        }
        var base;
        if (this.project.options.outDir !== undefined) {
            base = path.resolve(file.original.gulp.cwd, this.project.options.outDir) + '/';
        }
        else {
            base = file.original.gulp.base;
        }
        var fileJs = new gutil.File({
            path: path.join(root, file.fileName + '.js'),
            contents: new Buffer(file.content[OutputFileKind.JavaScript]),
            cwd: file.original.gulp.cwd,
            base: base
        });
        if (file.original.gulp.sourceMap)
            fileJs.sourceMap = JSON.parse(file.sourceMapString);
        this.streamJs.push(fileJs);
        if (this.project.options.declaration) {
            var fileDts = new gutil.File({
                path: path.join(root, file.fileName + '.d.ts'),
                contents: new Buffer(file.content[OutputFileKind.Definitions]),
                cwd: file.original.gulp.cwd,
                base: base
            });
            this.streamDts.push(fileDts);
        }
    };
    Output.prototype.finish = function (results) {
        var _this = this;
        if (this.project.sortOutput) {
            var sortedEmit = function (fileName) {
                var file = _this.files[fileName];
                if (!file || file.skipPush || file.pushed)
                    return;
                var references = file.original.ts.referencedFiles.map(function (file) { return tsApi.getFileName(file); });
                for (var ref in references) {
                    sortedEmit(utils.splitExtension(ref)[0]);
                }
                _this.emit(file);
            };
            for (var _i = 0, _a = Object.keys(this.files); _i < _a.length; _i++) {
                var fileName = _a[_i];
                sortedEmit(fileName);
            }
        }
        this.results = results;
        if (this.project.reporter.finish)
            this.project.reporter.finish(results);
        this.streamJs.push(null);
        this.streamDts.push(null);
    };
    Output.prototype.getError = function (info) {
        var err = new Error();
        err.name = 'TypeScript error';
        err.diagnostic = info;
        var codeAndMessageText = ts.DiagnosticCategory[info.category].toLowerCase() +
            ' TS' +
            info.code +
            ': ' +
            tsApi.flattenDiagnosticMessageText(this.project.typescript, info.messageText);
        if (!info.file) {
            err.message = codeAndMessageText;
            return err;
        }
        var fileName = tsApi.getFileName(info.file);
        var file = this.project.input.getFile(fileName);
        if (file) {
            err.tsFile = file.ts;
            err.fullFilename = file.fileNameOriginal;
            if (file.gulp) {
                fileName = path.relative(file.gulp.cwd, file.fileNameOriginal);
                err.relativeFilename = fileName;
                err.file = file.gulp;
            }
            else {
                fileName = file.fileNameOriginal;
            }
        }
        else {
            fileName = tsApi.getFileName(info.file);
            err.fullFilename = fileName;
        }
        var startPos = tsApi.getLineAndCharacterOfPosition(this.project.typescript, info.file, info.start);
        var endPos = tsApi.getLineAndCharacterOfPosition(this.project.typescript, info.file, info.start + info.length);
        err.startPosition = {
            position: info.start,
            line: startPos.line,
            character: startPos.character
        };
        err.endPosition = {
            position: info.start + info.length - 1,
            line: endPos.line,
            character: endPos.character
        };
        err.message = gutil.colors.red(fileName + '(' + startPos.line + ',' + startPos.character + '): ').toString()
            + codeAndMessageText;
        return err;
    };
    Output.prototype.diagnostic = function (info) {
        this.error(this.getError(info));
    };
    Output.prototype.error = function (error) {
        if (!error)
            return;
        // Save errors for lazy compilation (if the next input is the same as the current),
        this.errors.push(error);
        // call reporter callback
        if (this.project.reporter.error)
            this.project.reporter.error(error, this.project.typescript);
        // & emit the error on the stream.
        this.streamJs.emit('error', error);
    };
    Output.knownExtensions = ['js', 'js.map', 'd.ts'];
    return Output;
})();
exports.Output = Output;
