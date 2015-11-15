'use strict';

var assign = require('object-assign');
var path = require('path');
var process = require('process');

var GULP_EXE = 'gulp';
if (process.platform === 'win32') {
  GULP_EXE += '.cmd';
}

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsx: require('./grunt/config/jsx'),
    npm: require('./grunt/config/npm'),
    clean: [
      './build',
      './*.gem',
      './docs/_site',
      './examples/shared/*.js',
      '.module-cache',
    ],
    'compare_size': require('./grunt/config/compare_size'),
  });

  grunt.config.set('compress', require('./grunt/config/compress'));

  function spawnGulp(args, opts, done) {

    grunt.util.spawn({
      // This could be more flexible (require.resolve & lookup bin in package)
      // but if it breaks we'll fix it then.
      cmd: path.join('node_modules', '.bin', GULP_EXE),
      args: args,
      opts: assign({stdio: 'inherit'}, opts),
    }, function(err, result, code) {
      if (err) {
        grunt.fail.fatal('Something went wrong running gulp: ', result);
      }
      done(code === 0);
    });
  }

  Object.keys(grunt.file.readJSON('package.json').devDependencies)
    .filter(function(npmTaskName) {
      return npmTaskName.indexOf('grunt-') === 0;
    })
    .filter(function(npmTaskName) {
      return npmTaskName !== 'grunt-cli';
    })
    .forEach(function(npmTaskName) {
      grunt.loadNpmTasks(npmTaskName);
    });

  grunt.registerTask('eslint', require('./grunt/tasks/eslint'));

  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('delete-build-modules', function() {
    // Use gulp here.
    spawnGulp(['react:clean'], null, this.async());
  });

  // Register jsx:normal and :release tasks.
  grunt.registerMultiTask('jsx', require('./grunt/tasks/jsx'));

  grunt.registerMultiTask('npm', require('./grunt/tasks/npm'));

  var npmReactDOMTasks = require('./grunt/tasks/npm-react-dom');
  grunt.registerTask('npm-react-dom:release', npmReactDOMTasks.buildRelease);
  grunt.registerTask('npm-react-dom:pack', npmReactDOMTasks.packRelease);

  grunt.registerTask('version-check', require('./grunt/tasks/version-check'));

  grunt.registerTask('build:basic', [
    'build-modules',
    'version-check',
  ]);
  grunt.registerTask('build:min', [
    'build-modules',
    'version-check',
  ]);

  grunt.registerTask('test', ['jest']);
  grunt.registerTask('npm:test', ['build', 'npm:pack']);

  grunt.registerTask('jest', require('./grunt/tasks/jest'));

  // Optimized build task that does all of our builds. The subtasks will be run
  // in order so we can take advantage of that and only run build-modules once.
  grunt.registerTask('build', [
    'delete-build-modules',
    'build-modules',
    'version-check',
    'npm-react-dom:release',
    'npm-react-dom:pack',
    'compare_size',
  ]);

  grunt.registerTask('build-modules', function() {
    spawnGulp(['react:modules'], null, this.async());
  });

  // The default task - build - to keep setup easy.
  grunt.registerTask('default', ['build']);
};
