'use strict';

var twilio = require('twilio');

module.exports = function(agentId){
  var capability = new twilio.jwt.Capability(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  capability.allowClientIncoming(agentId);
  return capability.generate();
};
