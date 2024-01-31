const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('user connected:', socket.id);

    socket.on('messageSent', (data) => {
        console.log(data);
        io.emit('messageSent', data);
    })

    socket.on('joined', (username) => {
        io.emit('joined', username);
    })

    socket.on('exit', (username) => {
        io.emit('exit', username);
    })
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});