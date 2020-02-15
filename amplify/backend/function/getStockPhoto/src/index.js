const awsServerlessExpress = require('aws-serverless-express');
import fetch from 'node-fetch';
global.fetch = fetch;

import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: '15227e3541799021c4c6b628667bd9091c50b71e947f2547c73d57bd6a6a6e25',
});

const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  unsplash.search
    .photos('bar', 1, 1)
    .then(toJson)
    .then(json => {
      context.succeed(json);
    });

  awsServerlessExpress.proxy(server, event, context);
};
