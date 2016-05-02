var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator');

// POST: /conference/
router.post('/wait/', function (req, res) {
  res.send(twimlGenerator.generateWaitResponse().toString());
});

module.exports = router;