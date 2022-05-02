require('dotenv').config();
require('./config/db.config')

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const app = express();

/** Middlewares */
app.use(logger('dev'));
app.use(express.json());

/** Routes */
const routes = require('./config/routes.config');
app.use('/api', routes);

/** Error Handling */

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.info(`Application running at port ${port}`)
});
