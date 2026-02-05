const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

// view engine
app.set('view engine', 'ejs')

// static files
app.use(express.static(path.join(__dirname, 'public')))

// socket connection
io.on('connection', function (socket) {
  console.log('connected');
});

// route
app.get('/', (req, res) => {
  res.render('index');
});

server.listen(3000);
