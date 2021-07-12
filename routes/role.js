const express = require("express");
const roleController = require("../controllers/role");
const roleValidation = require("../middleware/validation/role");
const { authenticate } = require("../middleware/auth");

const router = express.Router();


router.route("/")
        .get(authenticate,roleController.getAllRoles)
        .post(authenticate,roleValidation.validate("CREATE"),roleController.postRole);

router.route("/:role_id")
     .get(authenticate,roleValidation.validate("GET"), roleController.getRole)
     .put(authenticate,roleValidation.validate("UPDATE"),roleController.updateRole)
     .patch(authenticate,roleValidation.validate("UPDATE"),roleController.updateRole)
     .delete(authenticate,roleValidation.validate("DELETE"),roleController.deleteRole);


module.exports = router;