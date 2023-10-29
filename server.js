require('dotenv').config();

const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const { Server } = require("socket.io");
const hbs = require('hbs');

const app = express();
const server = createServer(app);

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,'partials'));


app.get('/signup',(req,res)=>{
    res.render('signup');
}); 

app.get('/',(req,res)=>{
    res.render('index');
}); 

app.get('/login',(req,res)=>{
    res.render('login');
}); 


const io = new Server(server);

io.on('connection',(socket)=>{
    socket.on('message',(msg)=>{
        console.log(msg);
        socket.broadcast.emit('message',msg);

    });
    
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    
    });

    socket.emit('back','returned message!');
    io.to(socket.id).emit('backSame','messss');

});

server.listen(3000,()=>{
    console.log('listening on port 3000');
});