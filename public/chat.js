//Make connection
const socket = io.connect('http://localhost:4000');

//Query DOM
let message = document.getElementById('message');
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output'),
feedback = document.getElementById('feedback');

//grab and Emit events on the server, once button is clicked, 
btn.addEventListener('click', function (){
    socket.emit('chat', {
    message: message.value,
    handle:handle.value
    })
})

//grab and emit events on the server once there is a typing in message
message.addEventListener ('keypress', function(){
    socket.emit('typing', handle.value);
});
//Listen for events coming from the server, and output them to the DOM
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ' :</strong> ' + data.message + '</p>';
});

socket.on('typing', function(data){
feedback.innerHTML = '<p><em>' + data + ' is typing a message.....</em></p>';
});