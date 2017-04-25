'use strict';

var ClientCapability = require('twilio').jwt.ClientCapability;

module.exports = function(agentId){
  var capability = new ClientCapability({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN});

  capability.addScope(new ClientCapability.IncomingClientScope(agentId));
  return capability.toJwt();
};
