var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        requireed:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("User",userSchema);
