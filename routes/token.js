'use strict';

var express = require('express')
  , router = express.Router()
  , twilioCapabilityGenerator = require('../lib/twilio-capability-generator');

// POST: /token/
router.post('/:agentId/', function (req, res) {
  res.send({
    token: twilioCapabilityGenerator(req.params.agentId),
    agentId: req.params.agentId
  });
});

module.exports = router;