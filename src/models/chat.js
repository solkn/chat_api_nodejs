var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var chatSchema = new Schema({
    msg:{
        type:String,
        required:true
    },
    msgFrom:{
        type:String,
        required:true
    },
    msgTo:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("Chat",chatSchema);
