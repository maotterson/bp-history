const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const User = require("../models/User");
const Reading = require("../models/Reading");
//================================================================================================================
//  New Reading
//  POST /api/users/:id/readings
//
router.post('/users/:id/readings', (req, res, next) => {
  const reading = new Reading({
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(req.params.id),
    date: req.body.date,
    systolic: req.body.systolic,
    diastolic: req.body.diastolic,
    pulse: req.body.pulse
  });

  reading.save()
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
router.post('/users', async (req, res, next ) => {
  // generate password hash
  const passwordHash = await bcrypt.hash(req.body.password,saltRounds)

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: passwordHash,
    firstName: req.body.firstname,
    lastName: req.body.lastname
  });

  // see if username exists
  const filter = {
    username : user.username
  }
  User.findOne(filter).exec().then(match => {
    if(!match){
      console.log(user)
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
    }
    else{
      res.status(409).json({
        error: "Username already exists"
      });
    } 
  });
});
//================================================================================================================
//  Login attempt
//  POST /api/login
//
router.post('/login', async (req, res, next ) => {
  const username = req.body.username
  const passwordHash = await bcrypt.hash(req.body.password,saltRounds)
  const filter = {
    username : username,
    password : req.body.password
  }

  // attempt to match user/hashed password with a user in the database
  User.findOne(filter).exec().then(
    user => {
      if(user){
        const token = "token"
        res.status(200).json({
          message: "POST @ /login (login attempt)",
          token: token
        })
      }
      else{
        res.status(401).json({
          error: "Invalid username/password combination."
        })
      }
    }
  )
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
  User.findById(userId)
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
  let start, end;
  try{
    
    start = req.query.start ? new Date(req.query.start) : ""
    end = req.query.start ? new Date(req.query.end) : ""
  }
  catch (err){
    console.log(err)
  }
  
  const filter = {
    userId : userId
  }
  if(start!="Invalid Date"&&start!=""){
    filter['date']['$gte']=start;
  }
  if(end!="Invalid Date"&&end!=""){
    filter['date']['$lte']=end;
  }
  Reading.find(filter)
    .exec()
    .then(docs => {
      res.status(200).json({
        message: "GET @ /users/:id/readings (getting user's readings by UserId)",
        body : docs
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
//  Edit User Data
//  PATCH /api/users/:id
//
router.patch('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.updateOne({ _id: userId }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//================================================================================================================
//  Edit Reading
//  PATCH /api/users/:userid/readings/:readingid
//
router.patch('/users/:userid/readings/:readingid', (req, res, next) => {
  const userId = req.params.userid;
  const readingId = req.params.readingid;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  //verify that the user has access to this reading

  Reading.updateOne({ _id: readingId }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//================================================================================================================
//  Delete User
//  DELETE /api/users/:id
//
router.delete('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  User.remove({ _id: userId })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//================================================================================================================
//  Delete Reading
//  DELETE /api/users/:userid/readings/:readingid
//
router.delete('/users/:userid/readings/:readingid', (req, res, next) => {
  const userId = req.params.userid;
  const readingId = req.params.readingid;

  //verify that the user has access to this reading


  Reading.remove({ _id: userId })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;