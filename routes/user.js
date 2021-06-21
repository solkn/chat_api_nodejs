var express = require("express");

var router = express.Router();

var userController = require("../controllers/user");


router.post("/signup",userController.signUp);

router.post("/login",userController.login);


module.exports = router;
