///<reference path='../typings/tsd.d.ts'/>
var tsApi = require('./tsapi');
var utils = require('./utils');
var fs = require('fs');
var path = require('path');
var Host = (function () {
    function Host(typescript, currentDirectory, input, externalResolve, libFileName) {
        var _this = this;
        this.getCurrentDirectory = function () {
            return _this.currentDirectory;
        };
        this.writeFile = function (fileName, data, writeByteOrderMark, onError) {
            _this.output[fileName] = data;
        };
        this.getSourceFile = function (fileName, languageVersion, onError) {
            if (fileName === '__lib.d.ts') {
                return Host.getLibDefault(_this.typescript, _this.libFileName);
            }
            var sourceFile = _this.input.getFile(fileName);
            if (sourceFile)
                return sourceFile.ts;
            if (_this.externalResolve) {
                var text;
                try {
                    text = fs.readFileSync(fileName).toString('utf8');
                }
                catch (ex) {
                    return undefined;
                }
                _this.input.addContent(fileName, text);
                var sourceFile_1 = _this.input.getFile(fileName);
                if (sourceFile_1)
                    return sourceFile_1.ts;
            }
        };
        this.typescript = typescript;
        this.currentDirectory = currentDirectory;
        this.input = input;
        this.externalResolve = externalResolve;
        this.libFileName = libFileName;
        this.reset();
    }
    Host.getLibDefault = function (typescript, libFileName) {
        var fileName;
        for (var i in require.cache) {
            if (!Object.prototype.hasOwnProperty.call(require.cache, i))
                continue;
            if (require.cache[i].exports === typescript) {
                fileName = i;
            }
        }
        if (fileName === undefined) {
            return undefined; // Not found
        }
        fileName = path.join(path.dirname(fileName), libFileName);
        if (this.libDefault[fileName]) {
            return this.libDefault[fileName]; // Already loaded
        }
        var content = fs.readFileSync(fileName).toString('utf8');
        return this.libDefault[fileName] = tsApi.createSourceFile(typescript, '__lib.d.ts', content, 0 /* ES3 */); // Will also work for ES5 & 6
    };
    Host.prototype.reset = function () {
        this.output = {};
    };
    Host.prototype.getNewLine = function () {
        return '\n';
    };
    Host.prototype.useCaseSensitiveFileNames = function () {
        return false;
    };
    Host.prototype.getCanonicalFileName = function (filename) {
        return utils.normalizePath(filename);
    };
    Host.prototype.getDefaultLibFilename = function () {
        return '__lib.d.ts';
    };
    Host.prototype.getDefaultLibFileName = function () {
        return '__lib.d.ts';
    };
    Host.libDefault = {};
    return Host;
})();
exports.Host = Host;
