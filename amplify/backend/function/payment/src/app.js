var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'rj9z33zwvkm4n6sm',
  publicKey: '8t6mkc9cqgt4qpfy',
  privateKey: '4b15007dd0def9e920590d0edfe4c4fd',
});

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

/**********************
 * Example get method *
 **********************/

app.get('/client-token', async function(req, res) {
  const response = await gateway.clientToken.generate({});

  if (!response.success) {
    res.error({
      error: 'could not create client-token',
    });
  } else {
    console.log(`client-token: ${response.clientToken}`);
    res.json({
      success: 'successfully created client-token!',
      url: req.url,
      token: response.clientToken,
    });
  }
});

/****************************
 * Example post method *
 ****************************/

app.post('/checkout', async function(req, res) {
  // const nonceFromTheClient = req.body.payment_method_nonce;
  // below from Testing section of Briantree docs
  const nonceFromTheClient = 'fake-valid-nonce';

  // Use payment method nonce here
  console.log(`nonce: ${nonceFromTheClient}`);

  const response = await gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    // deviceData: deviceDataFromTheClient,
    options: {
      submitForSettlement: true,
    },
  });
  console.log(`response: ${JSON.stringify(response)}`);

  res.json({ success: 'checkout completed', response: response });
});

app.listen(3000, function() {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
