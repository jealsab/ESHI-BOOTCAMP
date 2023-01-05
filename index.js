const express = require('express') 
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



 
app.listen(port, () => {
  console.log(`Server is running ${port}`)
})