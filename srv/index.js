import express from 'express';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';

const apiRouter = require('./routes/api');
const dotenv = require('dotenv').config();

export default (app, http) => {
  //middleware to attach
  //for body parsing
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //connect to db via mongoose
  mongoose.connect(
    process.env.MONGO_CONNECTION_STRING, 
    {
      useMongoClient: true
    }
  );
  
  //for logging
  app.use(morgan('dev'));

  //if we need to enable CORS
  app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')

    //provide options request info
    if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE')
      return res.status(200).json({})
    }

    //to continue on to other routes below
    next();
  })

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