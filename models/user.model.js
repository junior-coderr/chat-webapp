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
        unique:[true,'This is the email address already registered'],
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    }, {timestamps:true});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;


