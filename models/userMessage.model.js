const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    messages:{
        type:Array,
        default:[]
    },
}, {timestamps:true});


const messageModel = mongoose.model('UserChat', userSchema);


module.exports = messageModel;