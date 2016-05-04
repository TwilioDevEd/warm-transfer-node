var twilio = require('twilio');
var config = require('./config');

var client = twilio(config['TWILIO_ACCOUNT_SID'], config['TWILIO_AUTH_TOKEN']);

var call = function(agentId, callbackUrl) {
  var twilioPhoneNumber = config['TWILIO_NUMBER'];
  
  client.makeCall({
    from: twilioPhoneNumber,
    to: "client:"+agentId,
    url: callbackUrl
  });

};

module.exports.call = call;