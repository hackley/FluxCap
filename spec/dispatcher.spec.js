var expect      = require('chai').expect;
var _           = require('underscore');
var Dispatcher  = require('../').Dispatcher;
var Store       = require('../').Store;

var count;
var MyDispatcher;
var MyStore;

function setup() {
  count        = 0;
  MyDispatcher = new Dispatcher();
  MyStore      = new Store();
}

function incrementBy(amount) {
  count += amount;
}


describe("Registering Stores", function() {
  beforeEach(setup);

  it('assigns a dispatch token to the store', function() {
    expect(MyStore.dispatchToken).to.equal(null);
    MyDispatcher.registerStore(MyStore);
    expect(MyStore.dispatchToken).not.to.equal(null);
  })

  it('dispatches events to the store', function() {
    MyDispatcher.registerStore(MyStore);
    MyStore.registeredActions = {};
    MyStore.registerAction('INCREMENT', incrementBy);
    expect(count).to.equal(0);
    MyDispatcher.dispatch('INCREMENT', 3)
    expect(count).to.equal(3);
    MyDispatcher.dispatch('INCREMENT', 1)
    expect(count).to.equal(4);
  })
})
