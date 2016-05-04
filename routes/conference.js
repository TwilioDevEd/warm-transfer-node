var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator')
  , Call = require('../models/call')
  , url = require('url')
  , twilioCaller = require('../lib/twilio-caller');

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
  res.send(twimlGenerator.waitResponseTwiml().toString());
});

router.post('/:conferenceId/connect/agent1/', function (req, res) {
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId:req.params['conferenceId'],
    waitUrl: AGENT_WAIT_URL, 
    startConferenceOnEnter: true, 
    endConferenceOnExit: false
  })
  .toString());
});

router.post('/:conferenceId/connect/agent2/', function (req, res) {
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId:req.params['conferenceId'],
    waitUrl: AGENT_WAIT_URL, 
    startConferenceOnEnter: true, 
    endConferenceOnExit: true
  })
  .toString());
});

router.post('/connect/client/', function (req, res) {
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
      conferenceId: conferenceId
    },
    {
      upsert: true
    })
  .then(function(err, doc){
    res.send(twimlGenerator.connectConferenceTwiml({
      conferenceId:conferenceId,
      waitUrl: AGENT_WAIT_URL, 
      startConferenceOnEnter: false,
      endConferenceOnExit: true
    })
    .toString());
  });
});

module.exports = router;