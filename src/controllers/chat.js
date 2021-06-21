//var mongoose = require("mongoose");
//Chat = mongoose.model("Chats");

 Chat = require("../models/chat");

 /** 
  *@param {object}req
  *@param {object}res
  *@param {functio}next
*/

 const getChats = function(req,res,next) {
    Chat.find({},function(err,chats){
        if(err){
            res.send(err);
        }
        res.json({
               data:chats,
        });
    });
    next();
}

/** 
  *@param {object}req
  *@param {object}res
  *@param {functio}next
*/

const getChat = function(req,res,next) {
    Chat.findById(req.params.chat_id,function (err,chat) {
        if(err){
            res.send(err);
        }
        res.json({
            data:chat,
        });
    });
    next();
    
}

/** 
  *@param {object}req
  *@param {object}res
  *@param {functio}next
*/

const postChat = function(req,res,next){
    var chat = new Chat();
    chat.msg = chat.body.msg;
    chat.msgFrom = chat.body.msgFrom;
    chat.msgTo = chat.body.msgTo;

    chat.save(function(err){
         
         if(err){
             res.send(err);
         }
         res.json({
             message:"new chat created",
             data:chat
         });
    });
    next();

}
/** 
  *@param {object}req
  *@param {object}res
  *@param {functio}next
*/
const updateChat = function(req,res,next) {
    Chat.findById(req.params.chat_id,function(err,chat){
        if(err){
            res.send(chat);
        }
        chat.msg = chat.body.msg;
        chat.msgFrom = chat.body.msgFrom;
        chat.msgTo = chat.body.msgTo;

        chat.save(function(err) {
            if(err){
                res.send(err);
            }
            res.json({
                message:"chat is updated successfully!",
                data:chat,
            });
            
        });
    });
    next();
    
}

/** 
  *@param {object}req
  *@param {object}res
  *@param {functio}next
*/

const deleteChat = function(req,res,next) {
    Chat.findByIdAndRemove(req.params.chat_id,function(err,chat){

        if(err){
            res.send(err);
        }
        res.json({
            status:"success",
            message:"chat is deleted succefully",
        });

    });
    next();
    
}

module.exports = {
    getChats,
    getChat,
    postChat,
    updateChat,
    deleteChat,
}