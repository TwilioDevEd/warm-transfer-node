'use strict';

var expect = require('chai').expect
  , app = require('../../app.js')
  , twilioCapabilityGenerator = require('../../lib/twilio-capability-generator')
  , cheerio = require('cheerio');

describe('twilio-capability-generator', function () {
  describe('#generate', function () {
    it('responds with generated token', function () {
      var token = twilioCapabilityGenerator('agentId');
      expect(token).to.not.be.null;
    });
  });
});