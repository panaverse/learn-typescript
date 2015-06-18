var tsApi = require('./tsapi');
var path = require('path');
var utils = require('./utils');
var Filter = (function () {
    function Filter(project, filters) {
        var _this = this;
        this.referencedFrom = undefined;
        this.referencedFromAll = undefined;
        this.project = project;
        if (filters.referencedFrom !== undefined) {
            this.referencedFrom = this.mapFilenamesToFiles(filters.referencedFrom);
            this.referencedFromAll = [];
            var addReference = function (file) {
                if (_this.referencedFromAll.indexOf(file.fileNameNormalized) !== -1)
                    return;
                _this.referencedFromAll.push(file.fileNameNormalized);
                for (var i = 0; i < file.ts.referencedFiles.length; i++) {
                    var ref = tsApi.getFileName(file.ts.referencedFiles[i]);
                    ref = utils.normalizePath(path.join(path.dirname(tsApi.getFileName(file.ts)), ref));
                    var refFile = _this.project.input.getFile(ref);
                    if (refFile)
                        addReference(refFile);
                }
            };
            for (var i = 0; i < this.referencedFrom.length; i++) {
                addReference(this.referencedFrom[i]);
            }
        }
    }
    Filter.prototype.mapFilenamesToFiles = function (filenames) {
        var files = [];
        for (var i = 0; i < filenames.length; i++) {
            var file = this.getFile(filenames[i]);
            if (file === undefined) {
                console.log('gulp-typescript: Could not find file ' + filenames[i]);
            }
            else {
                files.push(file);
            }
        }
        return files;
    };
    Filter.prototype.getFile = function (searchFileName) {
        var fileNames = this.project.input.getFileNames(true);
        for (var _i = 0; _i < fileNames.length; _i++) {
            var fileName = fileNames[_i];
            var file = this.project.input.getFile(fileName);
            if (!file || !file.gulp)
                continue;
            var base = path.resolve(file.gulp.cwd, file.gulp.base) + '/';
            if (file.gulp.path.substring(base.length) === searchFileName) {
                return file;
            }
        }
        return undefined;
    };
    Filter.prototype.match = function (fileName) {
        var fileNameExtensionless = utils.splitExtension(fileName)[0];
        var outputFile = this.project.output.files[fileNameExtensionless];
        if (!outputFile) {
            console.log('gulp-typescript: Could not find file ' + fileName + '. Make sure you don\'t rename a file before you pass it to ts.filter()');
            return false;
        }
        var file = outputFile.original;
        if (this.referencedFrom !== undefined) {
            if (!this.matchReferencedFrom(fileName, file)) {
                return false;
            }
        }
        return true;
    };
    Filter.prototype.matchReferencedFrom = function (filename, file) {
        return this.referencedFromAll.indexOf(file.fileNameNormalized) !== -1;
    };
    return Filter;
})();
exports.Filter = Filter;
