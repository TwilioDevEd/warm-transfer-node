module.exports = function() {
  if (process.env.NODE_ENV == 'test') {
    return 'mongodb://localhost/test';
  } else {
    return 'mongodb://localhost/warm-transfer';
  }
}