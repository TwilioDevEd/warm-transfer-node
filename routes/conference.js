var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator')
  , Call = require('../models/call');

// POST: /conference/
var AGENT_WAIT_URL = "http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical";

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
  Call.create({
    conferenceId: 'conference-id'
  }).then(function () {
    res.send('');
  });
});


module.exports = router;
