import express from 'express';
import path from 'path';
import morgan from 'morgan';

const apiRouter = require('./routes/api');

export default (app, http) => {

  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/api', apiRouter)

  app.use('/', express.static(path.join(__dirname, 'dist')))

  //other paths => 404 error
  app.use((req,res,next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  })

  //middleware that catches any thrown errors that made it to this line
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    })
  })

  
}