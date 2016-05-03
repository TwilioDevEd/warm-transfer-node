var express = require('express')
  , router = express.Router()
  , twilioCapabilityGenerator = require('../lib/twilio-capability-generator');

// POST: /token/
router.post('/generate/', function (req, res) {
  res.send(twilioCapabilityGenerator());
});

module.exports = router;