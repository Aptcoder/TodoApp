// Third party modules
const bodyParser = require('body-parser');
const express = require('express');

// my imports
const { handleError } = require('./utils/error');

const app = express();

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

app.use(bodyParser.json());

app.use('/', (req, res) => {
  res.send({
    message: 'Welcome!'
  });
});
// error handling middleware
app.use((err, req, res, next) => {
  handleError(res, err);
});

// 404 middleware
app.use('*', (req, res) => {
  const url = req.originalUrl;
  res.status(404).send({
    status: 'error',
    message: `Oops. ${req.method} ${url} not found on this website`
  });
});

export default app;
