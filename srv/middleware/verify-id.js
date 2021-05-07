const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  try {
    const requesterId = req.userData.id;
    const requestedId = req.params.userid;
    if(requesterId == requestedId){
      next();
    }
    else{
      return res.status(401).json({
        error: "Invalid authorization."
      });
    }
  } catch (error){
    return res.status(401).json({
      error: "Invalid authorization."
    });
  }
}