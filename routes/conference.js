var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator')
  , Call = require('../models/call')
  , url = require('url')
  , twilioCaller = require('../lib/twilio-caller');

// POST: /conference/
var AGENT_WAIT_URL = "http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical";

var connectConferenceUrl = function(req, agentId, conferenceId) {
  var pathname = "/connect"+agentId;
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: pathname
  });
};

router.post('/wait/', function (req, res) {
  res.send(twimlGenerator.generateWaitResponse().toString());
});

router.post('/connectAgent1/', function (req, res) {
  res.send(twimlGenerator
    .generateCnnectConferenceResponse(req.body['conferenceId'], AGENT_WAIT_URL, true, false)
    .toString());
});

router.post('/connectAgent2/', function (req, res) {
  res.send(twimlGenerator
    .generateCnnectConferenceResponse(req.body['conferenceId'], AGENT_WAIT_URL, true, true)
    .toString());
});

router.post('/connectClient', function (req, res) {
  var conferenceId = req.body['callSid'];
  var agentOne = 'agent1';
  var callbackUrl = connectConferenceUrl(req, agentOne, conferenceId);
  
  twilioCaller.call(agentOne, callbackUrl);

  Call.findOneAndUpdate(
    {
      agentId: agentOne
    },
    {
      agentId: agentOne,
      conferenceId: req.body['conferenceId']
    },
    {
      upsert: true
    })
    .then(function(err, doc){
      res.send('');
    }
  );
});

module.exports = router;