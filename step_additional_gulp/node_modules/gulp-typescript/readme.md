gulp-typescript
===============
A gulp plugin for handling TypeScript compilation workflow. The plugin exposes TypeScript's compiler options to gulp using TypeScript API.

[![Build Status](https://travis-ci.org/ivogabe/gulp-typescript.svg?branch=master)](https://travis-ci.org/ivogabe/gulp-typescript)

Features
--------
- Incremental compilation (so faster builds)
- Error reporting
- Different output streams for .js, .d.ts files.
- Support for sourcemaps using gulp-sourcemaps
- Compile once, and filter different targets

How to install
--------------
##### 1. Install gulp
```shell
npm install --global gulp
```
##### 2. Install gulp in the project dependency
```shell
npm install gulp
```
##### 3. Install gulp-typescript
```shell
npm install gulp-typescript
```

Options
-------
- ```out``` (string) - Generate one javascript and one definition file. Only works when no module system is used.
- ```outDir``` (string) - Move output to a different (virtual) directory. Note that you still need `gulp.dest` to write output to disk.
- ```removeComments``` (boolean) - Do not emit comments to output.
- ```noImplicitAny``` (boolean) - Warn on expressions and declarations with an implied 'any' type.
- ```noLib``` (boolean) - Don't include the default lib (with definitions for - Array, Date etc)
- ```noEmitOnError``` (boolean) - Do not emit outputs if any type checking errors were reported.
- ```target``` (string) - Specify ECMAScript target version: 'ES3' (default), 'ES5' or 'ES6'.
- ```module``` (string) - Specify module code generation: 'commonjs' or 'amd'.
- ```declarationFiles``` (boolean) - Generates corresponding .d.ts files.
- ```isolatedCompilation``` (boolean) - Compiles files seperately and doesn't check types, which causes a big speed increase. You have to use gulp-plumer and TypeScript 1.5 (or higher, 1.5-beta is not fully working).
- ```noExternalResolve``` (boolean) - Do not resolve files that are not in the input. Explanation below.
- ```sortOutput``` (boolean) - Sort output files. Usefull if you want to concatenate files (see below).
- ```typescript``` (object) - Use a different version / fork of TypeScript (see below). Use it like: `typescript: require('typescript')` or `typescript: require('my-fork-of-typescript')`

You can use almost all other options that TypeScript supports too. Only these two are not supported:
- `sourceRoot` - Use `sourceRoot` option of `gulp-sourcemaps` instead.
- `rootDir` - Use `base` option of `gulp.src()` instead.

Basic Usage
----------
Below is a minimal `gulpfile.js` which will compile all TypeScript file in folder `src` and emit a single output file called `output.js` in  `built/local`. To invoke, simple run `gulp`.

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js'
      }));
  return tsResult.js.pipe(gulp.dest('built/local'));
});
```
Another example of `gulpfile.js`. Instead of creating default task, the file specifies custom named task. To invoke, run `gulp scripts` instead of `gulp`. As a result, the task will generate both javascript files and typescript definition files.
```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');  // Require separate installation
gulp.task('scripts', function() {
  var tsResult = gulp.src('lib/**/*.ts')
    .pipe(ts({
        declarationFiles: true,
        noExternalResolve: true
      }));

  return merge([
    tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});
```

Incremental compilation
-----------------------
Instead of calling ```ts(options)```, you can create a project first, and then call ```ts(project)```. An example:
```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject({
	declarationFiles: true,
	noExternalResolve: true
});

gulp.task('scripts', function() {
	var tsResult = gulp.src('lib/*.ts')
					.pipe(ts(tsProject));

	return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
		tsResult.dts.pipe(gulp.dest('release/definitions')),
		tsResult.js.pipe(gulp.dest('release/js'))
	]);
});
gulp.task('watch', ['scripts'], function() {
    gulp.watch('lib/*.ts', ['scripts']);
});
```
When you run ```gulp watch```, the source will be compiled as usual. Then, when you make a change and save the file, your TypeScript files will be compiled in about half the time.

Make sure you create the project outside of a task! Otherwise it won't work.


Using `tsconfig.json`
-------------
To use `tsconfig.json`, you have to use `ts.createProject`:
```javascript
var tsProject = ts.createProject('tsconfig.json');
```
If you want to add or overwrite certain settings in the `tsconfig.json` file, you can use:
```javascript
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
```
The task will look like:
```javascript
gulp.task('scripts', function() {
	var tsResult = tsProject.src() // instead of gulp.src(...)
		.pipe(ts(tsProject));
	
	return tsResult.js.pipe(gulp.dest('release'));
});
```
Note: you can only use `tsProject.src()` if your `tsconfig.json` file has a `files` property. If it doesn't, you should use `gulp.src('**/**.ts')`.

TypeScript version
------------------
You can use a custom version of TypeScript. Add the version you want (1.4+) to your package.json file as a devDependency. You can also use the master from GitHub to get the latest features. You can use this in your `package.json` to get the master from GitHub:
```javascript
{
	"devDependencies": {
		"gulp-typescript": "*",
		"typescript": "Microsoft/TypeScript"
	}
}
```
And add this to your gulpfile:
```javascript
[...].pipe(ts({
	typescript: require('typescript')
}));
```
You can use 1.5.0-beta of TypeScript if you write this in your `package.json` file: `"typescript": "1.5.0-beta"`

It's also possible to use a fork of TypeScript. Add an extra option to the options object like this:
```javascript
[...].pipe(ts({
	typescript: require('my-fork-of-typescript')
}));
```

Filters
-------
There are two ways to filter files:
```javascript
gulp.task('scripts', function() {
	var tsResult = gulp.src('lib/*.ts')
					   .pipe(ts(tsProject, filterSettings));
	
	...
});
```
And
```javascript
gulp.task('scripts', function() {
	var tsResult = gulp.src('lib/*.ts')
					   .pipe(ts(tsProject));
	
	tsResult.pipe(ts.filter(filterSettings)) ... ;
});
```
The first example doesn't add files (that don't pass the filter) to the compiler, the second one does add them to the compiler,
but removes them later from the stream.
You can put as much pipes between compilation and filtering as you want, as long as the filename doesn't change.

At the moment there is only one filter available:

- ```referencedFrom``` (string[]) Only files that are referenced (using ```/// <reference path="..." />```) by the files in this array pass this filter.

Resolving files
---------------
By default, gulp-typescript will try to resolve the files you require and reference. These files are parsed, but not emitted (so you will not see them in the output stream).

If you set the option ```noExternalResolve``` to true, gulp-typescript will not resolve all the requires and references. It assumes that all the necessary files are in the input stream. For example, if you have your ```.ts``` files in the ```lib``` folder, and the ```.d.ts``` files in the ```definitions``` folder, you must use ```gulp.src(['lib/**.ts', 'definitions/**.ts'])``` instead of ```gulp.src(['lib/**.ts'])``` in your gulpfile if you use the option ```noExternalResolve```.

Advantage of ```noExternalResolve```: faster compilation.
Disadvantage of ```noExternalResolve```: won't work when you forgot some input files.
Advice: turn it on, and make sure you list all the input files.

Files that are resolved when ```noExternalResolve``` is off, won't be pushed to the output stream, unless you are using the `out` option.

Concatenate files
------------
The ```tsc``` command has the ability to concatenate using the ```--out``` parameter. There are two approaches to do that in ```gulp-typescript```.

You can use the `out` option. This is fine for small projects, but for big projects it's not always sufficient.

The other option is to use `gulp-concat`. The ```tsc``` command sorts the files using the ```<reference>``` tags. ```gulp-typescript``` does this when you enable the ```sortOutput``` option. You can use the ```referencedFrom``` filter to only include files that are referenced from certain files.


Source maps
----------
Example of ```gulpfile.js``` which will compile typescript to javascript as well as generate
associated sourcemap.

```javascript
var gulp = require('gulp')
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function() {
	var tsResult = gulp.src('lib/*.ts')
					   .pipe(sourcemaps.init()) // This means sourcemaps will be generated
					   .pipe(ts({
						   sortOutput: true,
						   // ...
					   }));
	
	return tsResult.js
				.pipe(concat('output.js')) // You can use other plugins that also support gulp-sourcemaps
				.pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
				.pipe(gulp.dest('release/js'));
});
```
For more information, see [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps).

Reporters
---------
You can specify a custom reporter as the 3rd argument of the main function:
```javascript
ts(optionsOrProject, filters, reporter);
```
You can set options, project or filter to `undefined` if you don't want to set them. Available reporters are:
- nullReporter (`ts.reporter.nullReporter()`) - Don't report errors
- defaultReporter (`ts.reporter.defaultReporter()`) - Report basic errors to the console
- longReporter (`ts.reporter.longReporter()`) - Extended version of default reporter, intelliJ link functionality + file watcher error highlighting should work using this one
- fullReporter (`ts.reporter.fullReporter(showFullFilename?: boolean)`) - Show full error messages, with source.

If you want to build a custom reporter, you take a look at `lib/reporter.ts`, in that file is an interface which a reporter should implement.

Build gulp-typescript
------------
The plugin uses itself to compile. There are 2 build directories, ```release``` and ```release-2```. ```release``` must always contain a working build. ```release-2``` contains the last build. When you run ```gulp compile```, the build will be saved in the ```release-2``` directory. ```gulp test``` will compile the source to ```release-2```, and then it will run some tests. If these tests give no errors, you can run ```gulp release```. The contents from ```release-2``` will be copied to ```release```.

License
-------
gulp-typescript is licensed under the [MIT license](http://opensource.org/licenses/MIT).
