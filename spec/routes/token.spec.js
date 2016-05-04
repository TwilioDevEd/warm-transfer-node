var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app.js');

describe('token route', function () {
  describe('POST /token/agent1/', function () {
    it.only('responds with token', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/token/agent1')
        .expect(200)
        .end(function (err, res) {
          expect(res.token).to.not.equal.null;
          expect(res.agentId).to.not.equal.null;
          done();
        });
    });
  });
});