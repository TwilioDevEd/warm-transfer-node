var twilio = require('twilio');

var connectConferenceResponse = function(conferenceId, waitUrl, startConferenceOnEnter, endConferenceOnExit){
  return new twilio.TwimlResponse().dial(function(dialNode){
    dialNode.conference(conferenceId, {
      'startConferenceOnEnter': startConferenceOnEnter,
      'endConferenceOnExit': endConferenceOnExit,
      'waitUrl': waitUrl
    });
  });
};

var waitResponse = function(){
	return new twilio.TwimlResponse()
		.say('Thank you for calling. Please wait in line for a few seconds. An agent will be with you shortly.')
  	.play('http://com.twilio.music.classical.s3.amazonaws.com/BusyStrings.mp3');
};

module.exports.generateWaitResponse = waitResponse;
module.exports.generateCnnectConferenceResponse = connectConferenceResponse;