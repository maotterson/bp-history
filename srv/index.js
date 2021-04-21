import express from 'express';
import path from 'path';
// import socketIO from "socket.io";

// router modules
const apiRouter = require('./routes/api');

export default (app, http) => {
  app.use(express.json());
  app.use('/', express.static(path.join(__dirname, 'dist')))
  app.use('/api', apiRouter)

  //app.get('/', (req,res,error) => {
  //res.sendFile('/index.html')
  //})
  // app.get('/foo', (req, res) => {
  //   res.json({msg: 'foo'});
  // });
  //
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  // 
  // optional support for socket.io
  // 
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
}