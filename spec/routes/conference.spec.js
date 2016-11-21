'use strict';

var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app.js')
  , Call = require('../../models/call')
  , mongoose = require('mongoose')
  , sinon = require('sinon')
  , mockery = require('mockery');

describe('conference route', function () {

  before(function (done) {
    mongoose.connect(require('../../lib/db-connection')(), done);
    mongoose.Promise = Promise;
  });

  after(function (done) {
    mongoose.disconnect(done);
  });

  describe('POST /conference/wait/', function () {
    it('responds with say & play', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/conference/wait')
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('say').length).to.equal(1);
          expect($('play').length).to.equal(1);
        })
      .expect(200, done);
    });
  });

  describe('POST /conference/conference-id1/connect/agent1', function () {
    it('responds with TwiML to connect agent 1', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/conference/conference-id1/connect/agent1')
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('Response Dial Conference').text()).to.equal('conference-id1');
          expect($('Response Dial Conference[waitUrl="http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical"]').length).to.equal(1);
          expect($('Response Dial Conference[startConferenceOnEnter="true"]').length).to.equal(1);
          expect($('Response Dial Conference[endConferenceOnExit="false"]').length).to.equal(1);
        })
      .expect(200, done);
    });
  });

  describe('POST /conference/conference-id2/connect/agent2', function () {
    it('responds with twiml to connect agent 2', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/conference/conference-id2/connect/agent2')
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('Response Dial Conference').text()).to.equal('conference-id2');
          expect($('Response Dial Conference[waitUrl="http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical"]').length).to.equal(1);
          expect($('Response Dial Conference[startConferenceOnEnter="true"]').length).to.equal(1);
          expect($('Response Dial Conference[endConferenceOnExit="true"]').length).to.equal(1);
        })
      .expect(200, done);
    });
  });

  describe('POST /conference/connect/client/', function () {

    var twilioCallerMock;

    beforeEach(function (done) {
      twilioCallerMock =  sinon.mock(require('../../lib/twilio-caller'));
      var resolvedPromise = new Promise(function(resolve, reject) {
        resolve();
      })
      twilioCallerMock.expects('call').once()
      .withArgs('agent1', sinon.match(/https\:\/\/127.0.0.1\:\d+\/conference\/conference-id\/connect\/agent1/))
      .returns(resolvedPromise);
      mockery.enable();
      mockery.warnOnUnregistered(false);
      mockery.registerMock('../../lib/twilio-caller', twilioCallerMock);
      Call.remove({}, done);
    });

    afterEach(function (done) {
      twilioCallerMock.restore();
      mockery.deregisterMock('../../lib/twilio-caller');
      mockery.disable();
      done();
    });

    it('makes a call', function (done) {
      var testApp = supertest(app);
      testApp
      .post('/conference/connect/client')
      .send({
        CallSid: 'conference-id'
      })
      .expect(200)
      .end(function(err, res) {
        twilioCallerMock.verify();
        done();
      });

    });

    it('persists the call in database', function (done) {
      var testApp = supertest(app);
      testApp
      .post('/conference/connect/client')
      .send({
        CallSid: 'conference-id'
      })
      .expect(200)
      .end(function(err, res) {
        Call.find({}, function(err, calls) {
          expect(calls.length).to.equal(1);
          done();
        });
      });
    });

    it(' does not create a new document when call already exists in database', function (done) {
      Call.create({
        agentId: 'agent1',
        conferenceId: 'conference-id',
      }, function(){
        var testApp = supertest(app);
        testApp
        .post('/conference/connect/client')
        .send({
          CallSid: 'conference-id'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          Call.find({}, function(err, calls) {
            expect(calls.length).to.equal(1);
            done();
          });
        })
      });
    });

    it('generates TwiML response', function (done) {
      var testApp = supertest(app);
      testApp
      .post('/conference/connect/client')
      .send({
        CallSid: 'conference-id'
      })
      .expect(function(res) {
        var $ = cheerio.load(res.text);
        expect($('Response Dial Conference').text()).to.equal('conference-id');
        expect($('Response Dial Conference[waitUrl="http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical"]').length).to.equal(1);
        expect($('Response Dial Conference[startConferenceOnEnter="false"]').length).to.equal(1);
        expect($('Response Dial Conference[endConferenceOnExit="true"]').length).to.equal(1);
      })
      .expect(200, done);
    });
  });

  describe('POST /conference/agent2/call/', function () {

    var twilioCallerMock;

    beforeEach(function (done) {
      twilioCallerMock =  sinon.mock(require('../../lib/twilio-caller'));
      var resolvedPromise = new Promise(function(resolve, reject) {
        resolve();
      })
      twilioCallerMock.expects('call').once()
      .withArgs('agent2', sinon.match(/https\:\/\/127.0.0.1\:\d+\/conference\/conference-id50\/connect\/agent2/))
      .returns(resolvedPromise);
      mockery.enable();
      mockery.warnOnUnregistered(false);
      mockery.registerMock('../../lib/twilio-caller', twilioCallerMock);

      done();
    });

    beforeEach(function (done) {
      Call.remove({})
      .then(function(){
        Call.create({
          agentId: 'agent1',
          conferenceId: 'conference-id50',
        });
      })
      .then(done);
    });

    afterEach(function (done) {
      twilioCallerMock.restore();
      mockery.deregisterMock('../../lib/twilio-caller');
      mockery.disable();
      done();
    });

    it('makes a call', function (done) {
      var testApp = supertest(app);
      testApp
      .post('/conference/agent1/call')
      .expect(function(res) {
        twilioCallerMock.verify();
      })
      .expect(200, done)
    });
  });
});
