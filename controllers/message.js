Message = require("../models/message");


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


 const getAllMessages = async function(req,res,next) {
    await Message.find({},function(err,chats){
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
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


const getMessage = async function(req,res,next) {
   await Message.findById(req.params.message_id,function (err,message) {
        if(err){
            res.send(err);
        }
        res.json({
            data:message,
        });
    });
    next();
    
}


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


const postMessage =  async function(req,res,next){
    var chat = new Message();
    chat.msg = req.body.msg;
    chat.msgFrom = req.body.msgFrom;
    chat.msgTo = req.body.msgTo;

    await chat.save(function(err){
         
         if(err){
             res.send(err);
             //console.log("error has occurred in adding message")
         }
         res.json({
             message:"new chat created",
             data:chat
         });
    });
    next();

}

/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/

const updateMessage = async function(req,res,next) {
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
    next();
    
}


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


const deleteMessage = async function(req,res,next) {
    await message.findByIdAndRemove(req.params.message_id,function(err,chat){

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
    getAllMessages,
    getMessage,
    postMessage,
    updateMessage,
    deleteMessage,
}