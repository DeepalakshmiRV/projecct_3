const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const mongoose = require('mongoose');
const Msg = require('./models/message');

const io = require("socket.io")(server);
const mongoDB = 'mongodb://localhost/mydb';
mongoose.connect(mongoDB).then(()=>{
    console.log("connected");
});

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection",function(socket){

    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username  +  "Joined the Conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username  +   "left the Conversation");
    });
    socket.on("chat",function(message){
        const msg = new Msg ({messages : message})
        msg.save().then(()=>{
            //socket.broadcast.emit("chat",message);
            io.emit("chat",JSON.parse(message));
        })
        
    });
});

server.listen(3000);

