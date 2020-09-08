const chalk = require('chalk');
const app = require('./app');
const { sequelize } = require('./database/models/index');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};
  // normalize and set the port
const port = normalizePort(process.env.PORT || '3000');

sequelize.authenticate()
  .then(() => {
    console.log(chalk.yellow('Database connection successful'));
  })
  .catch((err) => {
    console.log(chalk.red('Could not connect to database, ERROR::'), err);
  });

// create a http server
app.listen(port, () => {
  console.log(chalk.blue(`Server is listening on port ${port}`));
});
