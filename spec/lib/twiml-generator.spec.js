var expect = require('chai').expect
  , app = require('../../app.js')
  , twimlGenerator = require('../../lib/twiml-generator')
  , cheerio = require('cheerio');

describe('twiml-generator', function () {

  describe('#connectConferenceTwiml', function () {
    it('responds with proper twiml', function () {
      var twimlResponse = twimlGenerator.connectConferenceTwiml({
          conferenceId:'conference-id', 
          waitUrl: 'wait-url', 
          startConferenceOnEnter: true, 
          endConferenceOnExit: false
      });
      var $ = cheerio.load(twimlResponse.toString());
      expect($('Response Dial Conference').text()).to.equal('conference-id');
      expect($('Response Dial Conference[waitUrl="wait-url"]').length).to.equal(1);
      expect($('Response Dial Conference[startConferenceOnEnter="true"]').length).to.equal(1);
      expect($('Response Dial Conference[startConferenceOnEnter="false"]').length).to.equal(0);
      expect($('Response Dial Conference[endConferenceOnExit="false"]').length).to.equal(1);
      expect($('Response Dial Conference[endConferenceOnExit="true"]').length).to.equal(0);
    });
  });

  describe('#waitResponseTwiml', function () {
    it('responds with say & play', function () {
      var twimlResponse = twimlGenerator.waitResponseTwiml();
      var $ = cheerio.load(twimlResponse.toString());
      expect($('Play').length).to.equal(1);
      expect($('Say').length).to.equal(1);
    });
  });

});