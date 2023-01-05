const User = require("../models/user");
// const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// /
//  *
//  * @param {ObjectId} id
//  * @returns
//  */
// const getToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };
// 
// /
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (
      !user ||
      !(await user.verifyPassword(req.body.password, user.password)) //(candidate and userpwd)
    ) {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

   // const token = getToken(user._id);
    res.status(201).json({
      status: "success",
      //token,
      user,
    });
  } catch (err) {
    res.json({
      error: "err.message"
  })
  }
};

// /
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const user = await User.create(req.body);
    //const token = getToken(user._id);
    res.status(201).json({
      status: "success",
      //token,
      user,
    });
  } catch (err) {
    res.json({
      error: "err.message"
  })
  }
};

exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id,req.body, {new:true});
    //const token = getToken(user._id);
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "Book with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      //token,
      user,
    });
  } catch (err) {
    res.json({
      error: "err.message"
  })
  }
};



exports.delete = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User with this ID does not exist",
      });
    }
    res.status(204).json({
      status: "success",
      user: null,
    });
  } catch (err) {
    //TODO
  }
};

// function to get all users
exports.getAllUsers = async(req, res)=> {
  try {
      // to find the user from mongo
      const users = await User.find()
      return res.json({
          users: users
  })
      
  } catch (error) {
      console.log("err")
  }
  

}


// function for user get by id
exports.getUserById = async(req, res) => {
  try {
      const { id } = req.params; //destruction when { } is on the left side
      const user = await User.findById(id)
      if( !user ){
          return res.json({
              message: "user not found"
          })
      }
      return res.json({
          user: user
      })
      
  } catch (error) {


      res.json({
          error: "error"
      })
      
  }
  
}




// /
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// exports.serachUser = async (req, res, next) => {
//   try {
//     const regex = new RegExp(req.query.q);
//     const users = await User.find({
//       $and: [
//         {
//           email: {
//             $regex: regex,
//             $options: "si",
//           },
//         },
//         {
//           _id: { $ne: req.user._id },
//         },
//       ],
//     });
//     res.status(200).json({
//       status: "success",
//       users,
//     });
//   } catch (err) {
//     res.json({
//       error: "err.message"
//   })
//   }
// };