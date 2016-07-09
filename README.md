# Manifest

Finds a bunch of JS files using globs, then creates a file that `require`s them all.

## Example (using Gulp 4)

```javascript
gulp.task(manifest({
  outputFilename: 'manifest.js',
  files: [
    'src/prelude.js',
    'src/**/!(main).js',
    'src/main.js'
  ]
}))
```
