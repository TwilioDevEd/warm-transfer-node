var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../models/twiml-generator');

// POST: /conference/
router.post('/wait/', function (req, res) {
  res.send(twimlGenerator.waitResponse().toString());
});

module.exports = router;