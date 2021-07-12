const { body, param } = require("express-validator");
const mongoose = require("mongoose");

/**
 *
 * @param {String} type
 * GET | CREATE | UPDATE | DELETE
 */
exports.validate = (type) => {
  switch (type) {
    case "GET":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid role ID"),
      ];
    case "CREATE":
      return [
        body("id").not().isEmpty()
        .withMessage("id  is required"),
        body("name").not().isEmpty()
        .withMessage("name is required"),
         
      ];
    case "UPDATE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid role ID"),

          body("id").optional().not().isEmpty()
          .withMessage("id is required"),
          body("name").optional().not().isEmpty()
          .withMessage("name is required"),
        
      ];
    case "DELETE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid role ID"),
      ];

    default:
      return [];
  }
};