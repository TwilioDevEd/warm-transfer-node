var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app.js');

describe('token route', function () {
  describe('POST /token/generate/', function () {
    it('responds with token', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/token/generate')
        .expect(function (res) {
          expect(res.text).to.not.equal.null;
        })
      .expect(200, done);
    });
  });
});