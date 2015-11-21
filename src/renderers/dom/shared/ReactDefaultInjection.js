/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDefaultInjection
 */

'use strict';

var DefaultEventPluginOrder = require('DefaultEventPluginOrder');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var HTMLDOMPropertyConfig = require('HTMLDOMPropertyConfig');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var ReactComponentBrowserEnvironment =
  require('react/lib/ReactComponentBrowserEnvironment');
var ReactDOMComponent = require('ReactDOMComponent');
var ReactDOMComponentTree = require('react/lib/ReactDOMComponentTree');
var ReactDOMEmptyComponent = require('react/lib/ReactDOMEmptyComponent');
var ReactDOMTreeTraversal = require('ReactDOMTreeTraversal');
var ReactDOMTextComponent = require('react/lib/ReactDOMTextComponent');
var ReactDefaultBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');
var ReactEventListener = require('react/lib/ReactEventListener');
var ReactInjection = require('react/lib/ReactInjection');
var ReactReconcileTransaction = require('ReactReconcileTransaction');
var SimpleEventPlugin = require('react/lib/SimpleEventPlugin');

var alreadyInjected = false;

function inject() {
  if (alreadyInjected) {
    // TODO: This is currently true because these injections are shared between
    // the client and the server package. They should be built independently
    // and not share any injection state. Then this problem will be solved.
    return;
  }
  alreadyInjected = true;

  ReactInjection.EventEmitter.injectReactEventListener(
    ReactEventListener
  );

  /**
   * Inject modules for resolving DOM hierarchy and plugin ordering.
   */
  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
  ReactInjection.EventPluginUtils.injectComponentTree(ReactDOMComponentTree);
  ReactInjection.EventPluginUtils.injectTreeTraversal(ReactDOMTreeTraversal);

  /**
   * Some important event plugins included by default (without having to require
   * them).
   */
  ReactInjection.EventPluginHub.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
  });

  ReactInjection.NativeComponent.injectGenericComponentClass(
    ReactDOMComponent
  );

  ReactInjection.NativeComponent.injectTextComponentClass(
    ReactDOMTextComponent
  );

  ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);

  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);

  ReactInjection.EmptyComponent.injectEmptyComponentFactory(
    function(instantiate) {
      return new ReactDOMEmptyComponent(instantiate);
    }
  );

  ReactInjection.Updates.injectReconcileTransaction(
    ReactReconcileTransaction
  );
  ReactInjection.Updates.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  );

  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);

  if (__DEV__) {
    var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
    if ((/[?&]react_perf\b/).test(url)) {
      var ReactDefaultPerf = require('react/lib/ReactDefaultPerf');
      ReactDefaultPerf.start();
    }
  }
}

module.exports = {
  inject: inject,
};
