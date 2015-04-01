var expect = require('chai').expect;
var _      = require('underscore');
var Store  = require('../').Store;

var MyStore;
var count;

function setup() {
  MyStore = new Store();
  count   = 0;
}

function increment() {
  count ++;
}


describe("Change Listeners", function() {
  beforeEach(setup);

  afterEach(function() {
    MyStore.removeChangeListener(increment);
  })

  it('adds an event listener', function() {
    MyStore.addChangeListener(increment)
    expect(count).to.equal(0);
    MyStore.emitChange();
    expect(count).to.equal(1);
  })

  it('removes an event listener', function() {
    MyStore.addChangeListener(increment)
    MyStore.emitChange();
    expect(count).to.equal(1);
    MyStore.removeChangeListener(increment);
    MyStore.emitChange();
    expect(count).to.equal(1);
  })
})

describe('Registering an action', function() {
  beforeEach(setup);

  it('registers a new action', function() {
    MyStore.registerAction('MY_ACTION', increment);
    var registered = MyStore.registeredActions['MY_ACTION'];
    expect(_.isFunction(registered)).to.equal(true);
  })
})
