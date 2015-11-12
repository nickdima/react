/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

'use strict';

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  height: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  tvInteritemSpacing: true,
  tvLineSpacing: true,
  tvMinimumScaleFactor: true,
  tvTextMaxLines: true,
  width: true,
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
};

module.exports = CSSProperty;
