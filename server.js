const express = require('express');
const app = express();
const cors = require('cors')
const http = require("http");
const router = require('./src/router')
const fileUpLoad = require('express-fileupload')
const { Server } = require("socket.io");
// accecpt request allow user request to this api

app.use(cors())
//bodyParser accecpt take data from body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(fileUpLoad({
    useTempFiles: true
}))

app.use(router)
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data); 
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
      socket.emit('user_joined')
    });
  
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
server.listen(5000,(()=> console.log('oke')))