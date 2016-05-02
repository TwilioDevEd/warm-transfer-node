var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../app.js');

describe('agents', function () {
  describe('POST /conference/wait/', function () {
    it('responds with say & play', function (done) {
      var agent = supertest(app);
      agent
        .post('/conference/wait')
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('say').length).to.equal(1);
          expect($('play').length).to.equal(1);
        })
      .expect(200, done);
    });
  });
});