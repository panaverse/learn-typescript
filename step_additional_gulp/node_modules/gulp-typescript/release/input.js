///<reference path='../typings/tsd.d.ts'/>
var path = require('path');
var tsApi = require('./tsapi');
var utils = require('./utils');
(function (FileChangeState) {
    FileChangeState[FileChangeState["New"] = 0] = "New";
    FileChangeState[FileChangeState["Equal"] = 1] = "Equal";
    FileChangeState[FileChangeState["Modified"] = 2] = "Modified";
    FileChangeState[FileChangeState["Deleted"] = 3] = "Deleted";
    FileChangeState[FileChangeState["NotFound"] = 4] = "NotFound";
})(exports.FileChangeState || (exports.FileChangeState = {}));
var FileChangeState = exports.FileChangeState;
(function (FileKind) {
    FileKind[FileKind["Source"] = 0] = "Source";
    FileKind[FileKind["Config"] = 1] = "Config";
})(exports.FileKind || (exports.FileKind = {}));
var FileKind = exports.FileKind;
var File;
(function (File) {
    function fromContent(fileName, content) {
        var kind = FileKind.Source;
        if (path.extname(fileName).toLowerCase() === 'json')
            kind = FileKind.Config;
        return {
            fileNameNormalized: utils.normalizePath(fileName),
            fileNameOriginal: fileName,
            content: content,
            kind: kind
        };
    }
    File.fromContent = fromContent;
    function fromGulp(file) {
        var str = file.contents.toString('utf8');
        var data = fromContent(file.path, str);
        data.gulp = file;
        return data;
    }
    File.fromGulp = fromGulp;
    function equal(a, b) {
        if (a === undefined || b === undefined)
            return a === b; // They could be both undefined.
        return (a.fileNameOriginal === b.fileNameOriginal)
            && (a.content === b.content);
    }
    File.equal = equal;
    function getChangeState(previous, current) {
        if (previous === undefined) {
            return current === undefined ? FileChangeState.NotFound : FileChangeState.New;
        }
        if (current === undefined) {
            return FileChangeState.Deleted;
        }
        if (equal(previous, current)) {
            return FileChangeState.Equal;
        }
        return FileChangeState.Modified;
    }
    File.getChangeState = getChangeState;
})(File = exports.File || (exports.File = {}));
/**
 * Finds the common base path of two directories
 */
function getCommonBasePath(a, b) {
    var aSplit = a.split(/\\|\//); // Split on '/' or '\'.
    var bSplit = b.split(/\\|\//);
    var commonLength = 0;
    for (var i = 0; i < aSplit.length && i < bSplit.length; i++) {
        if (aSplit[i] !== bSplit[i])
            break;
        commonLength += aSplit[i].length + 1;
    }
    return a.substr(0, commonLength);
}
var FileDictionary = (function () {
    function FileDictionary(typescript) {
        this.files = {};
        this.firstSourceFile = undefined;
        this.typescript = typescript;
    }
    FileDictionary.prototype.addGulp = function (gFile) {
        return this.addFile(File.fromGulp(gFile));
    };
    FileDictionary.prototype.addContent = function (fileName, content) {
        return this.addFile(File.fromContent(fileName, content));
    };
    FileDictionary.prototype.addFile = function (file) {
        if (file.kind === FileKind.Source) {
            this.initTypeScriptSourceFile(file);
            if (!this.firstSourceFile)
                this.firstSourceFile = file;
        }
        this.files[file.fileNameNormalized] = file;
        return file;
    };
    FileDictionary.prototype.getFile = function (name) {
        return this.files[utils.normalizePath(name)];
    };
    FileDictionary.prototype.getFileNames = function (onlyGulp) {
        if (onlyGulp === void 0) { onlyGulp = false; }
        var fileNames = [];
        for (var fileName in this.files) {
            if (!this.files.hasOwnProperty(fileName))
                continue;
            var file = this.files[fileName];
            if (onlyGulp && !file.gulp)
                continue;
            fileNames.push(file.fileNameOriginal);
        }
        return fileNames;
    };
    FileDictionary.prototype.getSourceFileNames = function (onlyGulp) {
        var fileNames = this.getFileNames(onlyGulp);
        var sourceFileNames = fileNames
            .filter(function (fileName) { return fileName.substr(fileName.length - 5).toLowerCase() !== '.d.ts'; });
        if (sourceFileNames.length === 0) {
            // Only definition files, so we will calculate the common base path based on the
            // paths of the definition files.
            return fileNames;
        }
        return sourceFileNames;
    };
    Object.defineProperty(FileDictionary.prototype, "commonBasePath", {
        get: function () {
            var _this = this;
            var fileNames = this.getSourceFileNames(true);
            return fileNames
                .map(function (fileName) {
                var file = _this.files[utils.normalizePath(fileName)];
                return path.resolve(file.gulp.cwd, file.gulp.base);
            })
                .reduce(getCommonBasePath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDictionary.prototype, "commonSourceDirectory", {
        get: function () {
            var _this = this;
            var fileNames = this.getSourceFileNames();
            return fileNames
                .map(function (fileName) {
                var file = _this.files[utils.normalizePath(fileName)];
                return path.dirname(file.fileNameNormalized);
            })
                .reduce(getCommonBasePath);
        },
        enumerable: true,
        configurable: true
    });
    return FileDictionary;
})();
exports.FileDictionary = FileDictionary;
var FileCache = (function () {
    function FileCache(typescript, options) {
        this.previous = undefined;
        this.noParse = false; // true when using a file based compiler.
        this.version = 0;
        this.typescript = typescript;
        this.options = options;
        this.createDictionary();
    }
    FileCache.prototype.addGulp = function (gFile) {
        return this.current.addGulp(gFile);
    };
    FileCache.prototype.addContent = function (fileName, content) {
        return this.current.addContent(fileName, content);
    };
    FileCache.prototype.reset = function () {
        this.version++;
        this.previous = this.current;
        this.createDictionary();
    };
    FileCache.prototype.createDictionary = function () {
        var _this = this;
        this.current = new FileDictionary(this.typescript);
        this.current.initTypeScriptSourceFile = function (file) { return _this.initTypeScriptSourceFile(file); };
    };
    FileCache.prototype.initTypeScriptSourceFile = function (file) {
        if (this.noParse)
            return;
        if (this.previous) {
            var previous = this.previous.getFile(file.fileNameOriginal);
            if (File.equal(previous, file)) {
                file.ts = previous.ts; // Re-use previous source file.
                return;
            }
        }
        file.ts = tsApi.createSourceFile(this.typescript, file.fileNameOriginal, file.content, this.options.target, this.version + '');
    };
    FileCache.prototype.getFile = function (name) {
        return this.current.getFile(name);
    };
    FileCache.prototype.getFileChange = function (name) {
        var previous;
        if (this.previous) {
            previous = this.previous.getFile(name);
        }
        var current = this.current.getFile(name);
        return {
            previous: previous,
            current: current,
            state: File.getChangeState(previous, current)
        };
    };
    FileCache.prototype.getFileNames = function (onlyGulp) {
        if (onlyGulp === void 0) { onlyGulp = false; }
        return this.current.getFileNames(onlyGulp);
    };
    Object.defineProperty(FileCache.prototype, "firstSourceFile", {
        get: function () {
            return this.current.firstSourceFile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileCache.prototype, "commonBasePath", {
        get: function () {
            return this.current.commonBasePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileCache.prototype, "commonSourceDirectory", {
        get: function () {
            return this.current.commonSourceDirectory;
        },
        enumerable: true,
        configurable: true
    });
    FileCache.prototype.isChanged = function (onlyGulp) {
        if (onlyGulp === void 0) { onlyGulp = false; }
        if (!this.previous)
            return true;
        var files = this.getFileNames(onlyGulp);
        var oldFiles = this.previous.getFileNames(onlyGulp);
        if (files.length !== oldFiles.length)
            return true;
        for (var fileName in files) {
            if (oldFiles.indexOf(fileName) === -1)
                return true;
        }
        for (var fileName in files) {
            var change = this.getFileChange(fileName);
            if (change.state !== FileChangeState.Equal)
                return true;
        }
        return false;
    };
    return FileCache;
})();
exports.FileCache = FileCache;
