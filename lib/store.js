'use strict';

var EventEmitter = require('eventemitter3').EventEmitter;
var _            = require('underscore');
var CHANGE_EVENT = 'change';

function DataStore () {
  this.registeredActions = {};
  this.dispatchToken = null;
}

DataStore.prototype = new EventEmitter();

DataStore.prototype.emitChange = function() {
  this.emit(CHANGE_EVENT);
}

DataStore.prototype.addChangeListener = function(callback) {
  this.on(CHANGE_EVENT, callback);
}

DataStore.prototype.removeChangeListener = function(callback) {
  this.removeListener(CHANGE_EVENT, callback);
}

DataStore.prototype.registerAction = function(actionType, callback) {
  this.registeredActions[actionType] = callback;
};

module.exports = DataStore;
