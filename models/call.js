var mongoose = require('mongoose');

var Call = new mongoose.Schema({
  conferenceId:   String,
  agentId: String
});


module.exports = mongoose.model('call', Call);;