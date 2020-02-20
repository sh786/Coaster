const axios = require('axios');

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const UNSPLASH_APP_ID =
  '15227e3541799021c4c6b628667bd9091c50b71e947f2547c73d57bd6a6a6e25';

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

app.get('/stockPhoto', async function(req, res) {
  // Add your code here
  const photo = await axios
    .get('https://api.unsplash.com/search/photos', {
      params: { query: 'bar', page: 1, per_page: 1, orientation: 'landscape' },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_APP_ID}`,
      },
    })
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
  console.log(photo.data);
  res.json({ success: 'get call succeed!', urL: req.url, photo: photo.data });
});

app.get('/stockPhoto/*', function(req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/stockPhoto', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

app.post('/stockPhoto/*', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put('/stockPhoto', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/stockPhoto/*', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/stockPhoto', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/stockPhoto/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function() {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
