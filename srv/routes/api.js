const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require("../models/User");

//  New Reading
//  POST /api/users/:id/readings
//
router.post('/users/:id/readings', function(req, res, next) {
  const reading = {
    date: req.body.date,
    systolic: req.body.systolic,
    diastolic: req.body.diastolic,
    pulse: req.body.pulse
  };
  res.status(201).json({
    message: "new reading created",
    createdReading: reading
  })
});

//  New User
//  POST /api/users
//
router.post('/users', (req,res,next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  user
  .save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Handling POST requests to /users",
      createdUser: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

//  Get User Data by id
//  GET /api/users/:id
//
router.get('/users/:id', function(req, res, next) {
  let msg = "";
  try{
    msg = "got user data"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

//  Get Readings by User id (with query params for date)
//  GET /api/users/:id/readings?[start=????&end=????]
//
router.get('/users/:id/readings', function(req, res, next) {
  let msg = "";
  try{
    msg = "got user readings"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

//  Edit User Data
//  PUT /api/users/:id
//
router.put('/users/:id', function(req, res, next) {
  let msg = "";
  try{
    msg = "edited user"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

//  Edit Reading
//  PUT /api/users/:id/readings/:id
//
router.put('/users/:id/readings/:id', function(req, res, next) {
  let msg = "";
  try{
    msg = "edited reading"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

//  Delete User
//  DELETE /api/users/:id
//
router.delete('/users/:id', function(req, res, next) {
  let msg = "";
  try{
    msg = "deleted user"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

//  Delete Reading
//  DELETE /api/users/:id/readings/:id
//
router.delete('/users/:id/readings/:id', function(req, res, next) {
  let msg = "";
  try{
    msg = "deleted reading"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

module.exports = router;