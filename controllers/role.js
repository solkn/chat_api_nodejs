const Role = require("../models/role");
const { valdidationResult } = require("express-validator");


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


 exports.getAllRoles = async(req,res,next) =>{
    await Role.find({},function(err,roles){
        if(err){
            res.send(err);
        }
        res.json({
               status:"success",
               data:roles
        });
    });
}


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


exports.getRole = async(req,res,next) =>{
   await Role.findById(req.params.role_id,function (err,message) {
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


 exports.postRole =  async(req,res,next)=>{
    var role = new Role();

    role.roleID = req.body.roleID;
    role.name = req.body.name;

    await role.save(function(err){
         
         if(err){
             res.send(err);
         }
         res.json({
             message:"new role created",
             data:role
         });
    });

}

/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/

exports.updateRole = async(req,res,next) =>{
    await Role.findById(req.params.role_id,function(err,role){
        if(err){
            res.send(chat);
        }
        role.roleID = req.body.roleID;
        role.name = req.body.name;

        role.save(function(err) {
            if(err){
                res.send(err);
            }
            res.json({
                message:"role is updated successfully!",
                data:role,
            });
            
        });
    });
    
}


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


exports.deleteRole = async(req,res,next) =>{
    await Role.findByIdAndRemove(req.params.role_id,function(err,role){

        if(err){
            res.send(err);
        }
        res.json({
            status:"success",
            message:"role is deleted succefully",
        });

    });
    
}
