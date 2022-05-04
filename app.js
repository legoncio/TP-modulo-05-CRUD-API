require('dotenv').config();
require('./config/db.config')

const { default: mongoose } = require('mongoose');
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

app.use((error,req,res,next) => {
  if (error instanceof mongoose.Error.ValidationError){
    error =  createError(400, error)
  }else if (error instanceof mongoose.Error.CastError){
    error = createError(404, 'resource not found')
  }else if (error.message.includes('E11000')) {
    error = createError(409, 'Duplicated');
  }else if (!error.status) {
    error = createError(500, error);
  }

  console.error(error)

  res.status(error.status).json({
    message: error.message
  })
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.info(`Application running at port ${port}`)
});
