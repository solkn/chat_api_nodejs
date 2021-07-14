const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

/**
 *
 * @param {ObjectId} id
 * @returns
 */
const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (
      !user ||
      !(await user.verifyPassword(req.body.password, user.password))
    ) {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = getToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    console.log("error has occurred!");
  }
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const user = await User.create(req.body);
    const token = getToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    console.log("error has occurred!");
  }
}


/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.getAllUsers = async(req,res,next) =>{
  await User.find({},function(err,users){
      if(err){
          res.send(err);
      }
      res.json({
             status:"success",
             user:users
      });
  });
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.searchUser = async (req, res, next) => {
  try {
    const regex = new RegExp(req.query.q);
    const users = await User.find({
      email: {
        $regex: regex,
        $options: "si",
      },
    });
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    //TODO: Handle Error
  }
}

