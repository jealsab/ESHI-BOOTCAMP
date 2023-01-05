const express=require("express")
const router=express.Router()
const userController = require("../controllers/user");
const {getAllUsers, getUserById} = require("../controllers/user")

const userValidation = require("../middleware/validation/user");

// user router

router.get(getAllUsers)


router.route("/:id")

.get(getUserById)

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


