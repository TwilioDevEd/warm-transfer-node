'use strict';

var call = function(agentId, callbackUrl) {
  var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  var twilioPhoneNumber = process.env.TWILIO_NUMBER;

  client.makeCall({
    from: twilioPhoneNumber,
    to: `client:${agentId}`,
    url: callbackUrl
  });
};

module.exports.call = call;
