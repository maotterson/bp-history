var express = require('express');
var router = express.Router();

//  New Reading
//  POST /api/users/:id/readings
//
router.post('/users/:id/readings', function(req, res, next) {
  let msg = "";
  try{
    msg = "new reading added"
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

//  New User
//  POST /api/users
//
router.post('/users', function(req, res, next) {
  let msg = "";
  try{
    msg = "new user added"
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