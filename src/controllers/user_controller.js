//var mongoose = require("mongoose");
//User = mongoose.model("User");

User = require("../models/user.js");

const { bcryptHash,jwtSign } = require("../utils/util");

const login = function(req, res,next) {
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        /* Email not found */
        if(!user) {
          return res.json({
            status: 'USER_NOT_FOUND',
            message: 'user not found',
          });
        }
  
        /* Check if password is correct */
        bcrypt.compare(password, user.password).then(isMatch => {
          if(!isMatch) {
            return res.json({
              status: 'PASSWORD_INCORRECT',
              message: 'password incorrect',
            });
          }
  
          const payload = {
            id: user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            email: user.email,
            createdDate: user.createdDate,
          }
  
          jwtSign(payload)
            .then(token => {
              res.json({
                status: true,
                message: 'Login success!',
                ...payload,
                token: `Bearer ${token}`,
              });
            })
            .catch(err => {
              throw new Error(err);
            })
        });
      });
      next();
  }

 const signUp = function(req, res,next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          return res.json({
            status: 'EMAIL_ALREADY_EXISTS',
            message: 'email already exist',
          });
        }
  
        const newUser = User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        });
  
        bcryptHash(newUser.password)
          .then(hash => {
            newUser.password = hash;
            return newUser.save();
          })
          .then(() => {
            res.json({
              status: true,
              message: 'hashing password success!',
            });
          })
          .catch(err => {
            throw new Error(err);
          });
  
      });
      next();
  }

const getUserByUserName = function(err,usr,next) {
    User.findById(req.params.email,function (req,user) {
        if(err){
            res.send(err);
        }
        res.json({
            data:user,
        })
        
    })
    next();
    
}





const logout = function(req,res) {
    
}

module.exports = {
    login,
    signUp,
    getUserByUserName,
    logout
}