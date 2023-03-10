const express = require("express");
const bookController = require("../controllers/book");
const bookValidation = require("../middleware/validation/book");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

// book router
router
  .route("/")
  .get(verifyUser, bookController.getAllBooks)
  .post(
    verifyUser,
    bookController.uploadImage,
    bookValidation.validate("CREATE"),
    bookController.createBook
  );

router
  .route("/:id")
  .get(verifyUser, bookValidation.validate("GET"), bookController.getBook)
  .patch(
    verifyUser,
    bookValidation.validate("UPDATE"),
    bookController.updateBook
  )
  .delete(
    verifyUser,
    bookValidation.validate("DELETE"),
    bookController.deleteBook
  );

module.exports = router;
