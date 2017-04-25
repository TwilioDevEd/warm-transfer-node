'use strict';

var VoiceResponse = require('twilio').twiml.VoiceResponse;

var connectConferenceTwiml = function(options){
  var voiceResponse = new VoiceResponse();
  voiceResponse.dial().conference({
      'startConferenceOnEnter': options.startConferenceOnEnter,
      'endConferenceOnExit': options.endConferenceOnExit,
      'waitUrl': options.waitUrl
    }, options.conferenceId);

  return voiceResponse;
};

var waitResponseTwiml = function(){
  var voiceResponse = new VoiceResponse()
  voiceResponse.say({}, 'Thank you for calling. Please wait in line for a few seconds. An agent will be with you shortly.')
  voiceResponse.play({}, 'http://com.twilio.music.classical.s3.amazonaws.com/BusyStrings.mp3');

  return voiceResponse;
};

module.exports.waitResponseTwiml = waitResponseTwiml;
module.exports.connectConferenceTwiml = connectConferenceTwiml;
