require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { createServer } = require('node:http');
const path = require('path');
const { Server } = require("socket.io");
const ejs = require('ejs');
const mongoose = require('mongoose');
const destroySession = require('./middleware/destroySession');



const app = express();
const server = createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'secrete',
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge: 360000
    }
}))

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

app.post('/username',async (req,res)=>{
    const user = await userModel.findOne({username:req.body.username});
    if(user){
        res.json({isThere: true})
    }else{
        res.json({isThere: false})
    }
});

app.post('/email',async (req,res)=>{
    const user = await userModel.findOne({email:req.body.email});
    if(user){
        res.json({isThere: true})
    }else{
        res.json({isThere: false})
    }
});

app.post('/signup',async (req,res)=>{
    try{
        let userData = {
            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
        // console.log('pdon');
        const user = await userModel.create(userData);
        console.log(user);
        
        res.status(201).json({...user,next:'/login',status:true});
        
    }
    catch(err){
        console.log(err.message);
        res.status(201).json({err:'This email is already used!',status: false});
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
        console.log('p');
        if(user==null) {

            res.status(201).json({err:'Invalid credentials!',next:'/login',status: false});
        }else{
            req.session.user = {
                email: userData.email,
                fname:user.firstname,
                lname:user.lastname,
            }

            console.log(req.session.user);

            res.status(201).json({next:'/',status: true});
            
        }
        
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({err:'Something went wrong!',status: false});
        console.log('err')
    }

}); 

app.get('/',userAuth,(req,res)=>{
    let d = 'p';
    // req.session.user.fname
    res.render('index',{user:req.session.user});
}); 

app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            console.log('failed');
            res.status(401).json({next:'/',status: false});
        }else{
            console.log('success')
            res.status(201).json({next:'/login',status: true});
        }
    })

})

app.get('/login',destroySession,(req,res)=>{
    res.render('login');
}); 


app.post('/user/search',async (req,res)=>{
    try{
  let user = await userModel.findOne({username:req.body.username});
  console.log(user);

  if(user){
  res.json({
    status: 'success',
    username:user.username,
    firstname:user.firstname,
    lastname:user.lastname,
});
  }else{
    res.json({
       status:'failed'
    });
  }
}catch(e){
res.json({status:'Something went wrong',})
}
})

app.post('/chats/get',async (req,res)=>{
    console.log(req.body.current_user);
    let data = await userModel.findOne({email:req.body.current_user});
   
    res.json({data:data.friends});
})

const io = new Server(server,{
    cors:{
        origin:'*',
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true,
    }

});

io.on('connection',(socket)=>{

console.log('new connection  id: ' + socket.id);

socket.on('add_user_to_userlist',(data)=>{
    
     userModel.updateOne({email: data.current_user},{$push:{friends:{username:data.username,name:data.name}}}).then((user)=>{
        console.log(user);
     });
})
});




server.listen(3000,()=>{
    console.log('listening on port 3000');
});