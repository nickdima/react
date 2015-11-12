/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule HTMLDOMPropertyConfig
 */

'use strict';

var DOMProperty = require('DOMProperty');

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE =
  DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;

var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(
    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
  ),
  Properties: {
    /**
     * Standard Properties
     */
    accessibilityText: MUST_USE_ATTRIBUTE,
    aspectFill: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    autoHighlight: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    centered: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    firstName: MUST_USE_ATTRIBUTE,
    height: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    keyboardType: MUST_USE_ATTRIBUTE,
    lastName: MUST_USE_ATTRIBUTE,
    minLength: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    mode: MUST_USE_ATTRIBUTE,
    showsScrollIndicator: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    secure: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    src: MUST_USE_ATTRIBUTE,
    style: MUST_USE_ATTRIBUTE,
    theme: MUST_USE_ATTRIBUTE,
    type: MUST_USE_ATTRIBUTE,
    value: MUST_USE_ATTRIBUTE,
    width: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
  },
  DOMAttributeNames: {
    className: 'class',
  },
};

module.exports = HTMLDOMPropertyConfig;
