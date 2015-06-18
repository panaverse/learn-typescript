var ts = require('typescript');
var path = require('path');
var tsApi = require('./tsapi');
var input_1 = require('./input');
var output_1 = require('./output');
var host_1 = require('./host');
var filter_1 = require('./filter');
var reporter_1 = require('./reporter');
var utils = require('./utils');
/**
 * Compiles a whole project, with full type checking
 */
var ProjectCompiler = (function () {
    function ProjectCompiler() {
    }
    ProjectCompiler.prototype.prepare = function (_project) {
        this.project = _project;
    };
    ProjectCompiler.prototype.inputFile = function (file) { };
    ProjectCompiler.prototype.inputDone = function () {
        if (!this.project.input.firstSourceFile) {
            this.project.output.finish(reporter_1.emptyCompilationResult());
            return;
        }
        if (!this.project.input.isChanged(true)) {
            // Re-use old output
            var old = this.project.previousOutput;
            for (var _i = 0, _a = old.errors; _i < _a.length; _i++) {
                var error = _a[_i];
                this.project.output.error(error);
            }
            for (var _b = 0, _c = Object.keys(old.files); _b < _c.length; _b++) {
                var fileName = _c[_b];
                var file = old.files[fileName];
                this.project.output.write(file.fileName + '.js', file.content[output_1.OutputFileKind.JavaScript]);
                this.project.output.write(file.fileName + '.js.map', file.content[output_1.OutputFileKind.SourceMap]);
                if (file.content[output_1.OutputFileKind.Definitions] !== undefined) {
                    this.project.output.write(file.fileName + '.d.ts', file.content[output_1.OutputFileKind.Definitions]);
                }
            }
            this.project.output.finish(old.results);
            return;
        }
        var root = this.project.input.commonBasePath;
        this.project.options.sourceRoot = root;
        this.host = new host_1.Host(this.project.typescript, this.project.currentDirectory, this.project.input, !this.project.noExternalResolve, this.project.options.target >= 2 /* ES6 */ ? 'lib.es6.d.ts' : 'lib.d.ts');
        var rootFilenames = this.project.input.getFileNames(true);
        if (this.project.filterSettings !== undefined) {
            var filter = new filter_1.Filter(this.project, this.project.filterSettings);
            rootFilenames = rootFilenames.filter(function (fileName) { return filter.match(fileName); });
        }
        if (!this.project.singleOutput) {
            // Add an empty file under the root.
            // This will make sure the commonSourceDirectory, calculated by TypeScript, won't point to a subdirectory of the root.
            // We cannot use the `rootDir` option here, since that gives errors if the commonSourceDirectory points to a
            // directory containing the rootDir instead of the rootDir, which will break the build when using `noEmitOnError`.
            // The empty file is filtered out later on.
            var emptyFileName = path.join(root, '________________empty.ts');
            rootFilenames.push(emptyFileName);
            this.project.input.addContent(emptyFileName, '');
        }
        // Creating a program to compile the sources
        this.program = this.project.typescript.createProgram(rootFilenames, this.project.options, this.host);
        var _d = tsApi.getDiagnosticsAndEmit(this.program), errors = _d[0], result = _d[1];
        for (var i = 0; i < errors.length; i++) {
            this.project.output.diagnostic(errors[i]);
        }
        for (var fileName in this.host.output) {
            if (!this.host.output.hasOwnProperty(fileName))
                continue;
            var content = this.host.output[fileName];
            var _e = utils.splitExtension(fileName), extension = _e[1];
            if (extension === 'js') {
                content = this.removeSourceMapComment(content);
            }
            this.project.output.write(fileName, content);
        }
        this.project.output.finish(result);
    };
    Object.defineProperty(ProjectCompiler.prototype, "commonBaseDiff", {
        /**
         * Calculates the difference between the common base directory calculated based on the base paths of the input files
         * and the common source directory calculated by TypeScript.
         */
        get: function () {
            if (this._commonBaseDiff)
                return this._commonBaseDiff;
            var expected = this.project.input.commonBasePath;
            var real = this.project.input.commonSourceDirectory;
            var length = real.length - expected.length;
            this._commonBaseDiff = [length, real.substring(real.length - length)];
            if (length > 0) {
                this._commonBaseDiff = [length, real.substring(real.length - length)];
            }
            else {
                this._commonBaseDiff = [length, expected.substring(expected.length + length)];
            }
            if (this._commonBaseDiff[1] === '/' || this._commonBaseDiff[1] === '\\') {
                this._commonBaseDiff = [0, ''];
            }
            return this._commonBaseDiff;
        },
        enumerable: true,
        configurable: true
    });
    ProjectCompiler.prototype.correctSourceMap = function (map) {
        var _this = this;
        var _a = this.commonBaseDiff, diffLength = _a[0], diff = _a[1];
        if (this.project.singleOutput)
            return true;
        if (diffLength < 0) {
            // There were files added outside of the common base.
            var outsideRoot = false;
            map.sources = map.sources.map(function (fileName) {
                var full = utils.normalizePath(path.join(_this.project.input.commonSourceDirectory, fileName));
                var relative = path.relative(utils.normalizePath(_this.project.input.commonBasePath), full);
                var first2 = relative.substring(0, 2);
                var first3 = relative.substring(0, 3);
                if (first3 === '../' || first3 === '..\\') {
                    outsideRoot = true;
                }
                else if (first2 === './' || first2 === '.\\') {
                    relative = relative.substring(2);
                }
                return full.substring(full.length - relative.length);
            });
            if (outsideRoot)
                return false;
        }
        return true;
    };
    ProjectCompiler.prototype.removeSourceMapComment = function (content) {
        // By default the TypeScript automaticly inserts a source map comment.
        // This should be removed because gulp-sourcemaps takes care of that.
        // The comment is always on the last line, so it's easy to remove it
        // (But the last line also ends with a \n, so we need to look for the \n before the other)
        var index = content.lastIndexOf('\n', content.length - 2);
        return content.substring(0, index) + '\n';
    };
    return ProjectCompiler;
})();
exports.ProjectCompiler = ProjectCompiler;
var FileCompiler = (function () {
    function FileCompiler() {
        this.errorsPerFile = {};
        this.previousErrorsPerFile = {};
    }
    FileCompiler.prototype.prepare = function (_project) {
        this.project = _project;
        this.project.input.noParse = true;
    };
    FileCompiler.prototype.inputFile = function (file) {
        if (file.fileNameNormalized.substr(file.fileNameNormalized.length - 5) === '.d.ts') {
            return; // Don't compile definition files
        }
        if (this.project.input.getFileChange(file.fileNameOriginal).state === input_1.FileChangeState.Equal) {
            // Not changed, re-use old file.
            var old = this.project.previousOutput;
            for (var _i = 0, _a = this.previousErrorsPerFile[file.fileNameNormalized]; _i < _a.length; _i++) {
                var error = _a[_i];
                this.project.output.diagnostic(error);
            }
            this.errorsPerFile[file.fileNameNormalized] = this.previousErrorsPerFile[file.fileNameNormalized];
            for (var _b = 0, _c = Object.keys(old.files); _b < _c.length; _b++) {
                var fileName = _c[_b];
                var oldFile = old.files[fileName];
                if (oldFile.original.fileNameNormalized !== file.fileNameNormalized)
                    continue;
                this.project.output.write(oldFile.fileName + '.js', oldFile.content[output_1.OutputFileKind.JavaScript]);
                this.project.output.write(oldFile.fileName + '.js.map', oldFile.content[output_1.OutputFileKind.SourceMap]);
            }
            return;
        }
        var diagnostics = [];
        var outputString = tsApi.transpile(this.project.typescript, file.content, this.project.options, file.fileNameOriginal, diagnostics);
        for (var _d = 0; _d < diagnostics.length; _d++) {
            var diagnostic = diagnostics[_d];
            this.project.output.diagnostic(diagnostic);
        }
        var index = outputString.lastIndexOf('\n');
        var mapString = outputString.substring(index + 1);
        if (mapString.substring(0, 1) === '\r')
            mapString = mapString.substring(1);
        var start = '//# sourceMappingURL=data:application/json;base64,';
        if (mapString.substring(0, start.length) !== start) {
            console.error('Couldn\'t read the sourceMap generated by TypeScript. This is likely an issue with gulp-typescript.');
            return;
        }
        mapString = mapString.substring(start.length);
        var map = JSON.parse(new Buffer(mapString, 'base64').toString());
        map.sourceRoot = path.resolve(file.gulp.cwd, file.gulp.base);
        map.sources[0] = path.relative(map.sourceRoot, file.gulp.path);
        var fileNameExtensionless = utils.splitExtension(file.fileNameOriginal)[0];
        this.project.output.write(fileNameExtensionless + '.js', outputString.substring(0, index));
        this.project.output.write(fileNameExtensionless + '.js.map', JSON.stringify(map));
        this.errorsPerFile[file.fileNameNormalized] = diagnostics;
    };
    FileCompiler.prototype.inputDone = function () {
        this.project.output.finish(undefined);
        this.previousErrorsPerFile = this.errorsPerFile;
        this.errorsPerFile = {};
    };
    FileCompiler.prototype.correctSourceMap = function (map) {
        return true;
    };
    return FileCompiler;
})();
exports.FileCompiler = FileCompiler;
