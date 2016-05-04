var twilio = require('twilio');
var client = twilio(
  process.env.TWILIO_ACCOUNT_SID || 'my-account-sid', 
  process.env.TWILIO_AUTH_TOKEN || 'my-auth-token');

var call = function(agentId, callbackUrl) {
  var twilioPhoneNumber = process.env.TWILIO_NUMBER;
  
  client.makeCall({
    from: twilioPhoneNumber,
    to: "client:"+agentId,
    url: callbackUrl
  });

};

module.exports.call = call;