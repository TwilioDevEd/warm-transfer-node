# Warm Transfer: Transfer support calls from one agent to another using Twilio, Node.js and Express

[![Build Status](https://travis-ci.org/TwilioDevEd/warm-transfer-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/warm-transfer-node)

## Requirements:
* [Node](http://nodejs.org/)
* [MongoDb](http://docs.mongodb.org/manual/installation/)

## Local development

1. First clone this repository and `cd` into it.
   ```bash
   git clone git@github.com:TwilioDevEd/warm-transfer-node.git
   cd warm-transfer-node
   ```

1. Install dependencies:
  ```bash
  $ npm install
  ```

1. Make sure the tests succeed.
  ```bash
  $ npm test
  ```

1. Edit the lib/config.js file to match your configuration.

 You can find your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in your
 [Twilio Account Settings](https://www.twilio.com/user/account/settings).
 You will also need a `TWILIO_NUMBER`, you may find it [here](https://www.twilio.com/user/account/phone-numbers/incoming).

1. Run the application.
  ```bash
  $ npm start
  ```

1. Check it out at [http://localhost:3000](http://localhost:3000).

1. Expose your application to the wider internet using [ngrok](http://ngrok.com). This step
  is important because the application won't work as expected if you run it through
  localhost.

  ```bash
  $ ngrok http 3000
  ```

  Once ngrok is running, open up your browser and go to your ngrok URL. It will
  look something like this: `http://9a159ccf.ngrok.io`

  You can read [this blog post](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html)
  for more details on how to use ngrok.

1. Configure Twilio to call your webhooks

  You will also need to configure Twilio to call your application when calls are received on your `TWILIO_NUMBER`. The voice url should look something like this:

  ```
  http://<your-ngrok-subdomain>.ngrok.io/Conference/ConnectClient
  ```

  ![Configure Voice](http://howtodocs.s3.amazonaws.com/twilio-number-config-all-med.gif)

That's it!


## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.