var expect      = require('chai').expect;
var _           = require('underscore');
var Dispatcher  = require('../').Dispatcher;
var Store       = require('../').Store;

var MyDispatcher  = new Dispatcher();
var BritishStore  = new Store();
var AmericanStore = new Store();

var _armies = {
  british:  9000,
  american: 200
}

function _removeCasulties(armyName, number) {
  _armies[armyName] -= number;
}

function sendReport(casultyReport) {
  MyDispatcher.dispatch('BATTLE_COMPLETE', casultyReport);
}

MyDispatcher.registerStore(BritishStore);
MyDispatcher.registerStore(AmericanStore);

BritishStore.registerAction('BATTLE_COMPLETE', function(casultyReport) {
  _removeCasulties('british', casultyReport.british);
})

AmericanStore.registerAction('BATTLE_COMPLETE', function(casultyReport) {
  _removeCasulties('american', casultyReport.american);
})

function _getBritishCount() {
  return _armies.british;
}

function _getAmericanCount() {
  return _armies.american;
}

describe("Integration", function() {
  it('updates several stores via a single dispatcher', function() {
    var britishCount = _getBritishCount();
    var americanCount = _getAmericanCount();

    BritishStore.addChangeListener(function() {
      britishCount = _getBritishCount();
    })

    AmericanStore.addChangeListener(function() {
      americanCount = _getAmericanCount();
    })

    expect(britishCount).to.equal(9000);
    expect(americanCount).to.equal(200);

    sendReport({ british: 1200, american: 50 });
    expect(britishCount).to.equal(7800);
    expect(americanCount).to.equal(150);

    sendReport({ british: 3150, american: 6 });
    expect(britishCount).to.equal(4650);
    expect(americanCount).to.equal(144);

    sendReport({ british: 4591, american: 1 });
    expect(britishCount).to.equal(59);
    expect(americanCount).to.equal(143);
  })
})
