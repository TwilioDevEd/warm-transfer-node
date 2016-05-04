var config = {};

config['TWILIO_ACCOUNT_SID'] = process.env.TWILIO_ACCOUNT_SID || 'my-account-sid';
config['TWILIO_AUTH_TOKEN'] = process.env.TWILIO_AUTH_TOKEN || 'my-auth-token';
config['TWILIO_NUMBER'] = process.env.TWILIO_NUMBER || 'my-twilio-phone-number';

module.exports = config;