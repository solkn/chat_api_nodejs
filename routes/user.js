var express = require("express");
var userController = require("../controllers/user");
var userValidation = require("../middleware/validation/user");
var { authenticate } = require("../middleware/auth");


var router = express.Router();



router.post("/signup",
            userValidation.validate("SIGNUP"),
            userController.signUp
            );

router.post("/login",
            userValidation.validate("LOGIN"),
            userController.login
            );
router.get("/search",authenticate,userController.searchUser);

module.exports = router;
