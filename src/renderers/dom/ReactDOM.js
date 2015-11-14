/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOM
 */

'use strict';

var ReactDefaultInjection = require('ReactDefaultInjection');
var ReactMount = require('ReactMount');
var ReactPerf = require('ReactPerf');
var ReactUpdates = require('ReactUpdates');
var ReactVersion = require('ReactVersion');

var findDOMNode = require('findDOMNode');
var renderSubtreeIntoContainer = require('renderSubtreeIntoContainer');
var warning = require('warning');

ReactDefaultInjection.inject();

var render = ReactPerf.measure('React', 'render', ReactMount.render);

var React = {
  findDOMNode: findDOMNode,
  render: render,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
  /* eslint-enable camelcase */
};

if (__DEV__) {
  var ExecutionEnvironment = require('ExecutionEnvironment');
  if (ExecutionEnvironment.canUseDOM && window.top === window.self) {

    var testFunc = function testFn() {};
    warning(
      (testFunc.name || testFunc.toString()).indexOf('testFn') !== -1,
      'It looks like you\'re using a minified copy of the development build ' +
      'of React. When deploying React apps to production, make sure to use ' +
      'the production build which skips development warnings and is faster. ' +
      'See https://fb.me/react-minification for more details.'
    );

    var expectedFeatures = [
      // shims
      Array.isArray,
      Array.prototype.every,
      Array.prototype.forEach,
      Array.prototype.indexOf,
      Array.prototype.map,
      Date.now,
      Function.prototype.bind,
      Object.keys,
      String.prototype.split,
      String.prototype.trim,
    ];

    for (var i = 0; i < expectedFeatures.length; i++) {
      if (!expectedFeatures[i]) {
        warning(
          false,
          'One or more ES5 shims expected by React are not available: ' +
          'https://fb.me/react-warning-polyfills'
        );
        break;
      }
    }
  }
}

module.exports = React;
