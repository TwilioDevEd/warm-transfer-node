'use strict';

var dbConnection = function() {
  if (process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/test';
  }

  return 'mongodb://localhost/warm-transfer';
};

module.exports = dbConnection; 