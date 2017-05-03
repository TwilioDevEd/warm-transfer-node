'use strict';

var expect = require('chai').expect
  , twilioCaller = require('../../lib/twilio-caller')
  , sinon = require('sinon')
  , mockery = require('mockery');

describe('twilio-caller', function () {
  describe('#call', function () {
    var twilio = require('twilio');

    var twilioStub = () => ({ calls: new TwilioClientStub() });

    var TwilioClientStub = sinon.stub();
    var createSpy = sinon.spy();

    TwilioClientStub.prototype.create = createSpy;

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

    it('makes a call to client:agent3', function () {
      twilioCaller.call('agent3', 'callback-url');

      expect(createSpy.calledWith({
        from: 'my-twilio-number',
        to: 'client:agent3',
        url: 'callback-url'
      })).to.be.true;
    });
  });
});
