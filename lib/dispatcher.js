'use strict';

var FluxDispatcher = require('flux').Dispatcher;
var _              = require('underscore');

function Dispatcher () {
  /* constructor */
}

Dispatcher.prototype = new FluxDispatcher();

Dispatcher.prototype.dispatch = function(type, data) {
  FluxDispatcher.prototype.dispatch.call(this, {
    type: type,
    data: data
  });
}

Dispatcher.prototype.registerStore = function(store) {
  store.dispatchToken = this.register(function(action){
    var registeredAction = store.registeredActions[action.type];

    if (_.isFunction(registeredAction)) {
      registeredAction(action.data);
      store.emitChange();
    }

    return true;
  })
}

module.exports = Dispatcher;
