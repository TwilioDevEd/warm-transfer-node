var expect = require('chai').expect
  , app = require('../../app.js')
  , twimlGenerator = require('../../lib/twiml-generator')
  , parser = require('xml2json');

describe('twiml-generator', function () {

  describe('#generateCnnectConferenceResponse', function () {
    it('responds with proper twiml', function () {
      var twimlResponse = twimlGenerator.generateCnnectConferenceResponse('conference-id', 'wait-url', true, false);
      var jsonResponse = JSON.parse(parser.toJson(twimlResponse.toString()));
      
      expect(jsonResponse).to.have.property('Response');
      expect(jsonResponse['Response']).to.have.property('Dial');
      expect(jsonResponse['Response']['Dial']).to.have.property('Conference');
      expect(jsonResponse['Response']['Dial']['Conference']['waitUrl']).to.equal('wait-url');
      expect(jsonResponse['Response']['Dial']['Conference']['startConferenceOnEnter']).to.equal('true');
      expect(jsonResponse['Response']['Dial']['Conference']['endConferenceOnExit']).to.equal('false');
      expect(jsonResponse['Response']['Dial']['Conference']['endConferenceOnExit']).to.equal('false');
      expect(jsonResponse['Response']['Dial']['Conference']['$t']).to.equal('conference-id');
    });
  });

  describe('#waitResponse', function () {
    it('responds with say & play', function () {
      var waitResponse = twimlGenerator.generateWaitResponse();
      expect(waitResponse).to.have.property('say');
      expect(waitResponse).to.have.property('play');
    });
  });

});