const express = require('express');
const socket = require('socket.io');
//Set up App
const app = express();
const server = app.listen(4000, () => {
    console.log('listening to requests on port 4000')
})

//Static files
app.use(express.static('public'));

//Socket setup
const io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);
   //Once you receive the chat message, send to all clients socket connected to it. 
    socket.on('chat', function(data){
     io.sockets.emit('chat', data);
    });

    //once your receive the typing message, send to all clients socket connected to it apart from self
    socket.on('typing', function(data){
     socket.broadcast.emit('typing', data)
    });

});
