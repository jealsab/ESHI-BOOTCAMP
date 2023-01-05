//npm run dev
// npm start run
// mongosh --port 27017

//reqest and response (req and res)
//postaman- when we dont finish the frontend and we want to test we use it
// put is the update of the object
//patch is only updated the sameller part of the object



const express = require('express') 
// importing the express package in ES5 ; ES6 is like react
const mongoose = require ("mongoose")
const dotenv = require('dotenv');
const app = express()
app.use(express.json())

const port = 3000
const userRouter=require("./src/routes/user")
const bookRouter=require("./src/routes/book")
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://127.0.0.1:27017/Book_collection", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(()=>{
    console.log("connected to database")
});


// 
dotenv.config()

app.use("/users",userRouter)
app.use("/books",bookRouter)



//is async 
app.listen(port, () => {
  console.log(`Server is running ${port}`)
})