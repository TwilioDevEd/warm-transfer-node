'use strict';

var call = function(agentId, callbackUrl) {
  var twilioPhoneNumber = process.env.TWILIO_NUMBER;
  var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  return client.calls
    .create({
      from: twilioPhoneNumber,
      to: `client:${agentId}`,
      url: callbackUrl
    });
};

module.exports.call = call;
