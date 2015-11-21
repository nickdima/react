'use strict';

var grunt = require('grunt');

module.exports = function() {
  var pkgVersion = grunt.config.data.pkg.version;

  var versions = {
    'packages/react-dom/package.json':
      grunt.file.readJSON('./packages/react-dom/package.json').version,
    // Get the "version" without the range bit
    'src/ReactVersion.js': require('../../src/ReactVersion'),
  };

  // Return true (ok) or false (failed)
  return Object.keys(versions).reduce(function(prev, name) {
    var version = versions[name];
    var ok = true;
    if (version !== pkgVersion) {
      grunt.log.error(
        '%s version does not match package.json. Expected %s, saw %s.',
        name,
        pkgVersion,
        version
      );
      ok = false;
    }
    return prev && ok;
  }, true);
};
