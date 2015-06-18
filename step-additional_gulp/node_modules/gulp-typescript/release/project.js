///<reference path='../typings/tsd.d.ts'/>
var ts = require('typescript');
var vfs = require('vinyl-fs');
var path = require('path');
var through2 = require('through2');
var utils = require('./utils');
var input_1 = require('./input');
var output_1 = require('./output');
var Project = (function () {
    function Project(configFileName, config, options, noExternalResolve, sortOutput, typescript) {
        if (typescript === void 0) { typescript = ts; }
        this.typescript = typescript;
        this.configFileName = configFileName;
        this.config = config;
        this.options = options;
        this.noExternalResolve = noExternalResolve;
        this.sortOutput = sortOutput;
        this.singleOutput = options.out !== undefined;
        this.input = new input_1.FileCache(typescript, options);
    }
    /**
     * Resets the compiler.
     * The compiler needs to be reset for incremental builds.
     */
    Project.prototype.reset = function (outputJs, outputDts) {
        this.input.reset();
        this.previousOutput = this.output;
        this.output = new output_1.Output(this, outputJs, outputDts);
    };
    Project.prototype.src = function () {
        var _this = this;
        var configPath = path.dirname(this.configFileName);
        var base;
        if (this.config.compilerOptions && this.config.compilerOptions.rootDir) {
            base = path.resolve(configPath, this.config.compilerOptions.rootDir);
        }
        else {
            base = configPath;
        }
        if (!this.config.files) {
            var files = [path.join(base, '**/*.ts')];
            if (this.config.excludes instanceof Array) {
                files = files.concat(this.config.excludes.map(function (file) { return '!' + path.resolve(base, file); }));
            }
            return vfs.src(files);
        }
        var resolvedFiles = [];
        var checkMissingFiles = through2.obj(function (file, enc, callback) {
            this.push(file);
            resolvedFiles.push(utils.normalizePath(file.path));
            callback();
        });
        checkMissingFiles.on('finish', function () {
            for (var _i = 0, _a = _this.config.files; _i < _a.length; _i++) {
                var fileName = _a[_i];
                var fullPaths = [
                    utils.normalizePath(path.join(configPath, fileName)),
                    utils.normalizePath(path.join(process.cwd(), configPath, fileName))
                ];
                if (resolvedFiles.indexOf(fullPaths[0]) === -1 && resolvedFiles.indexOf(fullPaths[1]) === -1) {
                    var error = new Error("error TS6053: File '" + fileName + "' not found.");
                    console.error(error.message);
                    checkMissingFiles.emit('error', error);
                }
            }
        });
        return vfs.src(this.config.files.map(function (file) { return path.resolve(base, file); }), { base: base })
            .pipe(checkMissingFiles);
    };
    return Project;
})();
exports.Project = Project;
