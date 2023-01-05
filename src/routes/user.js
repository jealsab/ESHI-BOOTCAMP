const express=require("express")
const router=express.Router()
const userController = require("../controllers/user");
const userValidation = require("../middleware/validation/user");


// router.get
router.post(
  "/signup",
  userValidation.validate("SIGNUP"),
  userController.signup
);


router.post(
    "/login",
    userValidation.validate("LOGIN"),
    userController.login
  );

  router
  .route("/:id")
  // .get( userValidation.validate("GET"), bookController.getBook)
  .patch(
    
    
    userController.update
  )
  .delete(
    (userController.delete)
  
    
  );

// router.delete()

module.exports = router


