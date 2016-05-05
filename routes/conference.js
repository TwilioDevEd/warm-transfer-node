var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator')
  , Call = require('../models/call')
  , url = require('url')
  , twilioCaller = require('../lib/twilio-caller');

var AGENT_WAIT_URL = "http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical";

var connectConferenceUrl = function(req, agentId, conferenceId) {
  var pathname = "/conference/"+conferenceId+"/connect/"+agentId;
  return url.format({
    protocol: 'https',
    host: req.get('host'),
    pathname: pathname
  });
};

router.post('/wait/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.waitResponseTwiml().toString());
});

router.post('/:conferenceId/connect/agent1/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId:req.params['conferenceId'],
    waitUrl: AGENT_WAIT_URL, 
    startConferenceOnEnter: true, 
    endConferenceOnExit: false
  })
  .toString());
});

router.post('/:conferenceId/connect/agent2/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId:req.params['conferenceId'],
    waitUrl: AGENT_WAIT_URL, 
    startConferenceOnEnter: true, 
    endConferenceOnExit: true
  })
  .toString());
});

router.post('/connect/client/', function (req, res) {
  var conferenceId = req.body['CallSid'];
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
  .then(function(doc){
    res.type('text/xml');
    res.send(twimlGenerator.connectConferenceTwiml({
      conferenceId:conferenceId,
      waitUrl: AGENT_WAIT_URL, 
      startConferenceOnEnter: false,
      endConferenceOnExit: true
    })
    .toString());
  });
});

router.post('/:agentId/call/', function (req, res) {
  var agentTwo = 'agent2';
  Call.findOne({agentId: req.params['agentId']}, function (err, call) {
    var callbackUrl = connectConferenceUrl(req, agentTwo, call.conferenceId);
    twilioCaller.call(agentTwo, callbackUrl);
    res.sendStatus(200);
  });
});


module.exports = router;