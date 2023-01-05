const { body,param } = require("express-validator");
const path = require("path");
// @param {String} type
/**
 *
 * @param {String} type
 * LOGIN | SIGNUP
 */
exports.validate = (type) => {
  switch (type) {
    case "LOGIN":
      return [
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").not().isEmpty().withMessage("Password is required"),
      ];

    case "SIGNUP":
      return [
        body("firstname").not().isEmpty().withMessage("First Name is required"),
        body("lastname").not().isEmpty().withMessage("Last Name is required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").not().isEmpty().withMessage("Password is required"),
      ];

    

   
    default:
      return [];
  }
};
