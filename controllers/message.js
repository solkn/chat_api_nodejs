const Message = require("../models/message");
const { valdidationResult } = require("express-validator");


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


 exports.getAllMessages = async(req,res,next) =>{
    await Message.find({},function(err,chats){
        if(err){
            res.send(err);
        }
        res.json({
               status:"success",
               data:chats
        });
    });
}




/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


exports.getMessage = async(req,res,next) =>{
   await Message.findById(req.params.message_id,function (err,message) {
        if(err){
            res.send(err);
        }
        res.json({
            data:message,
        });
    });
    
}


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


 exports.postMessage =  async(req,res,next)=>{
    var chat = new Message();
    chat.msg = req.body.msg;
    chat.msgFrom = req.body.msgFrom;
    chat.msgTo = req.body.msgTo;

    await chat.save(function(err){
         
         if(err){
             res.send(err);
         }
         res.json({
             message:"new chat created",
             data:chat
         });
    });

}

/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/

exports.updateMessage = async(req,res,next) =>{
    await Message.findById(req.params.message_id,function(err,chat){
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
    
}


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


exports.deleteMessage = async(req,res,next) =>{
    await message.findByIdAndRemove(req.params.message_id,function(err,chat){

        if(err){
            res.send(err);
        }
        res.json({
            status:"success",
            message:"chat is deleted succefully",
        });

    });
    
}
