require('dotenv').config();

const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const { Server } = require("socket.io");
const ejs = require('ejs');
const mongoose = require('mongoose');



const app = express();
const server = createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
// hbs.registerPartials(path.join(__dirname,'partials'));


const userAuth = require('./middleware/userAuth');
const userModel = require('./models/user.model.js')



mongoose.connect('mongodb+srv://pratik:pratik@cluster0.hrhamxz.mongodb.net/users?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Successfully database connected!')
})
.catch(error=>{console.log('Error connecting to database')})


app.get('/signup',(req,res)=>{
    res.render('signup');
}); 

app.post('/signup',async (req,res)=>{
    try{
        let userData = {
            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            password: req.body.password
        }
        console.log('pdon');
        const user = await userModel.create(userData);
        console.log(user);
        setTimeout(() => {
        res.status(201).json({...user,next:'/login',status: 'true'});
        }, 3000);
    }
    catch(err){
        console.log(err.message);
        res.status(201).json({err:err.message,status: 'false'});
        console.log('err')
    }

}); 

app.post('/login',async (req,res)=>{
    try{
        let userData = {
            email: req.body.email,
            password: req.body.password
        }

        const user = await userModel.findOne(userData);
        console.log(user);
        
        if(user==null) {

            res.status(201).json({next:'/login',status: false});
        }else{

            res.status(201).json({next:'/',status: true});
        }
        
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({err:err.message,status: 'false'});
        console.log('err')
    }

}); 

app.get('/',userAuth,(req,res)=>{
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