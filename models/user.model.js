const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email must be unique'],
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    username:{
        type:String,
        required:true,
        unique:[true,'This username is already taken'],
    },
    friends:{
        type:Array,
        default:[],
        sparse:true
    },
    }, {timestamps:true});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;


