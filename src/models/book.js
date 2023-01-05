const mongoose = require("mongoose")
mongoose.set("strictQuery", true);
// book model
const BookSchema = new mongoose.Schema({
    title:{
        type:String

},
description:{
    type:String
},
image:{
    type:String
},
creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
author:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"

}],
content:{
    type:String
}
})
// to use it in other file
module.exports=mongoose.model('Book',BookSchema)
