var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
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
        required:true,
        unique:true
    },

    createdOn:{
        type:Date,
        default:Date.now
    }
});

const Message = mongoose.model("Message",messageSchema);

module.exports = Message;
