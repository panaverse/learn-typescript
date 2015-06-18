///<reference path='../typings/tsd.d.ts'/>
var path = require('path');
function normalizePath(pathString) {
    return path.normalize(pathString).toLowerCase();
}
exports.normalizePath = normalizePath;
/**
 * Splits a filename into an extensionless filename and an extension.
 * 'bar/foo.js' is turned into ['bar/foo', 'js']
 * 'foo.d.ts' is parsed as ['foo', 'd.ts'] if you add 'd.ts' to knownExtensions.
 * @param knownExtensions An array with known extensions, that contain multiple parts, like 'd.ts'. 'a.b.c' should be listed before 'b.c'.
 */
function splitExtension(fileName, knownExtensions) {
    if (knownExtensions) {
        for (var _i = 0; _i < knownExtensions.length; _i++) {
            var ext_1 = knownExtensions[_i];
            var index_1 = fileName.length - ext_1.length - 1;
            if (fileName.substr(index_1) === '.' + ext_1) {
                return [fileName.substr(0, index_1), ext_1];
            }
        }
    }
    var ext = path.extname(fileName).toLowerCase().substr(1);
    var index = fileName.length - ext.length;
    return [fileName.substr(0, index - 1), ext];
}
exports.splitExtension = splitExtension;
