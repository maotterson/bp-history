var express = require('express');
var router = express.Router();

//
//  /api/users/:id
//
router.post('/users', function(req, res, next) {
  let msg = "";
  try{
    msg = "post request"
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