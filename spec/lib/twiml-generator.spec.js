var expect = require('chai').expect
  , app = require('../../app.js')
  , twimlGenerator = require('../../lib/twiml-generator');

describe('twiml-generator', function () {
  describe('#waitResponse', function () {
    it('responds with say & play', function () {
      var waitResponse = twimlGenerator.waitResponse();
      expect(waitResponse).to.have.property('say');
      expect(waitResponse).to.have.property('play');
    });
  });
});