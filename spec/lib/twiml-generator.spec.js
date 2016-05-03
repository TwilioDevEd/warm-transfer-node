var expect = require('chai').expect
  , app = require('../../app.js')
  , twimlGenerator = require('../../lib/twiml-generator')
  , cheerio = require('cheerio');

describe('twiml-generator', function () {

  describe('#generateCnnectConferenceResponse', function () {
    it('responds with proper twiml', function () {
      var twimlResponse = twimlGenerator.generateCnnectConferenceResponse('conference-id', 'wait-url', true, false);
      var $ = cheerio.load(twimlResponse.toString());
      expect($('Response Dial Conference').text()).to.equal('conference-id');
      expect($('Response Dial Conference[waitUrl="wait-url"]').length).to.equal(1);
      expect($('Response Dial Conference[startConferenceOnEnter="true"]').length).to.equal(1);
      expect($('Response Dial Conference[startConferenceOnEnter="false"]').length).to.equal(0);
      expect($('Response Dial Conference[endConferenceOnExit="false"]').length).to.equal(1);
      expect($('Response Dial Conference[endConferenceOnExit="true"]').length).to.equal(0);
    });
  });

  describe('#waitResponse', function () {
    it('responds with say & play', function () {
      var twimlResponse = twimlGenerator.generateWaitResponse();
      var $ = cheerio.load(twimlResponse.toString());
      expect($('Play').length).to.equal(1);
      expect($('Say').length).to.equal(1);
    });
  });

});