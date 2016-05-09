'use strict';

var expect = require('chai').expect
  , twilioCaller = require('../../lib/twilio-caller')
  , sinon = require('sinon')
  , mockery = require('mockery');

describe('twilio-caller', function () {
  describe('#call', function () {
    var twilio = require('twilio');

    var twilioStub = function(accountSid, authToken){
      return new TwilioClientStub();
    };

    var TwilioClientStub = sinon.stub();
    var makeCallSpy = sinon.spy();

    TwilioClientStub.prototype.makeCall = makeCallSpy;

    before(function (done) {
      mockery.enable();
      mockery.warnOnUnregistered(false);
      mockery.registerMock('twilio', twilioStub);
      done();
    });

    after(function (done) {
      mockery.deregisterMock('twilio');
      mockery.disable();
      done();
    });

    it.only('makes a call', function () {
      twilioCaller.call('agent3', 'callback-url');

      expect(makeCallSpy.calledWith({
        from: 'my-twilio-number',
        to: 'client:agent3',
        url: 'callback-url'
      })).to.be.true;
    });
  });
});