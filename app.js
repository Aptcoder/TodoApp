// Third party modules
const bodyParser = require('body-parser');
const express = require('express');

// my imports
const { handleError } = require('./utils/error');
// route imports
const userRouter = require('./routes/user-routes');
const todoRouter = require('./routes/todo-routes');

const app = express();

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/user/todos', todoRouter);
// error handling middleware
app.use((err, req, res, next) => {
  handleError(res, err);
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
} else {
  // 404 middleware
  app.use('*', (req, res) => {
    const url = req.originalUrl;
    res.status(404).send({
      status: 'error',
      message: `Oops. ${req.method} ${url} not found on this website`
});
});
}


module.exports = app;
