const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  try {
    const tokenIp = req.userData.ip;
    const requesterIp = req.headers['x-forwarded-for']
    if(tokenIp == requesterIp){
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