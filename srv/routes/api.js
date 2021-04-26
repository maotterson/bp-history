const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require("../models/User");
const Reading = require("../models/Reading");
//================================================================================================================
//  New Reading
//  POST /api/users/:id/readings
//
router.post('/users/:id/readings', (req, res, next) => {
  const reading = new Reading({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    systolic: req.body.systolic,
    diastolic: req.body.diastolic,
    pulse: req.body.pulse
  });
  const userId = req.params.id;

  // pushing new reading to current user's readings array, 
  // could alternatively add readings to a separate collection with userId property
  User.updateOne({ _id: userId }, { $push : { readings : reading} })
    .exec()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "POST @ /users/:id/readings (creating new reading)",
        createdReading : result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//================================================================================================================
//  New User
//  POST /api/users
//
router.post('/users', (req, res, next ) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  user.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "POST @ /users (creating new user)",
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
//================================================================================================================
//  Get User Data by id
//  GET /api/users/:id
//
router.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  // get user by id request will not contain readings
  const selectOptions = 
  User.findById(userId)
    .select('-readings')
    .exec()
    .then(user => {
      console.log(user);
      res.status(200).json({
        message: "GET @ /users/:id (getting user by Id)",
        body : user
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//================================================================================================================
//  Get Readings by User id (with query params for date)
//  GET /api/users/:id/readings?[start=????&end=????]
//
router.get('/users/:id/readings', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .exec()
    .then(user => {
      console.log(user.readings);
      res.status(200).json({
        message: "GET @ /users/:id/readings (getting user's readings by UserId)",
        body : user.readings
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//  Edit User Data
//  PUT /api/users/:id
//
router.put('/users/:id', (req, res, next) => {
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
//================================================================================================================
//  Edit Reading
//  PUT /api/users/:id/readings/:id
//
router.put('/users/:id/readings/:id', (req, res, next) => {
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
//================================================================================================================
//  Delete User
//  DELETE /api/users/:id
//
router.delete('/users/:id', (req, res, next) => {
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
//================================================================================================================
//  Delete Reading
//  DELETE /api/users/:id/readings/:id
//
router.delete('/users/:id/readings/:id', (req, res, next) => {
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