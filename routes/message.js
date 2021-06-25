var express = require("express");

var router = express.Router();

var chatController = require("../controllers/message");

router.route("/")
        .get(chatController.getChats)
        .post(chatController.postChat);

router.route("/:message_id")
     .get(chatController.getChat)
     .put(chatController.updateChat)
     .patch(chatController.updateChat)
     .delete(chatController.deleteChat);


module.exports = router;
