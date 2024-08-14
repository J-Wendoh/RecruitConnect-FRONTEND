const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('send_message', (msg) => {
    io.emit('receive_message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('http://localhost:5000/users', (req, res) => {
  res.json([{ id: 1, username: 'John' }, { id: 2, username: 'Jane' }]);
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
