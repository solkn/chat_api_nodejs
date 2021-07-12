var mongoose = require("mongoose");

var roleSchema = new mongoose.Schema({
   
    roleID:{
        type:Number,
        unique:true
    },
    name:{
        type:String,
        unique:true
    }
});

const Role = mongoose.model("Role",roleSchema);

module.exports = Role;
