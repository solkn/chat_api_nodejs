const express = require("express");
const userController = require("../controllers/user");
const userValidation = require("../middleware/validation/user");
const { authenticate } = require("../middleware/auth");


const router = express.Router();



router.post("/signup",
             authenticate,
             userValidation.validate("SIGNUP"),
             userController.signup
             );

router.post("/login",
             authenticate,
             userValidation.validate("LOGIN"),
             userController.login 
             );

router.get("/search",
            authenticate,
            userValidation.validate("GET"),
            userController.searchUser
            );

module.exports = router;
