'use strict';

var twilio = require('twilio');

var connectConferenceTwiml = function(options){
  return new twilio.TwimlResponse().dial(function(dialNode){
    dialNode.conference(options.conferenceId, {
      'startConferenceOnEnter': options.startConferenceOnEnter,
      'endConferenceOnExit': options.endConferenceOnExit,
      'waitUrl': options.waitUrl
    });
  });
};

var waitResponseTwiml = function(){
  return new twilio.TwimlResponse()
      .say('Thank you for calling. Please wait in line for a few seconds. An agent will be with you shortly.')
      .play('http://com.twilio.music.classical.s3.amazonaws.com/BusyStrings.mp3');
};

module.exports.waitResponseTwiml = waitResponseTwiml;
module.exports.connectConferenceTwiml = connectConferenceTwiml;
