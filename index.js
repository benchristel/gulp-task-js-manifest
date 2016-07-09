var file = require('gulp-file')
var glob = require('glob')
var gulp = require('gulp')
var pathUtils = require('path')

module.exports = function manifest (options) {
  var files = options.files
  var outputFilename = options.outputFilename
  var manifestDir = pathUtils.dirname(outputFilename)
  var manifestName = pathUtils.basename(outputFilename)

  return function manifest () {
    var contents = expandGlobs(files)
      .map(pathRelativeTo(manifestDir))
      .map(wrapInRequireCall).join('\n')

    return file(manifestName, contents, { src: true })
      .pipe(gulp.dest(manifestDir))
  }
}

function expandGlobs (globs) {
  return globs
    .map(function (g) { return glob.sync(g) })
    .reduce(function (a, b) { return a.concat(b) })
}

function wrapInRequireCall (path) {
  return "require('./" + path + "')"
}

function pathRelativeTo (dir) {
  return function (path) {
    return pathUtils.relative(dir, path)
  }
}
