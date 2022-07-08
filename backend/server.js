
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var socket = io.connect('http://localhost');

io.on('connection', (socket) => {  
  console.log('a user connected'); 


    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected');
   });


  socket.on('message', (msg) => {
  console.log(msg);

  socket.broadcast.emit('message-broadcast', msg);
   }); 
});



// app.get('/', (req, res) => res.send('hello!')
// );

// app.use((req, res) => {
//   res.header('Access-Control-Allow-Origin', '*');
// });


app.get('/', function(req, res){
  res.sendFile('E:/test/server.js');
});

http.listen(3000, () => {
console.log('listening on *:3000');
});


