const mongoose = require("mongoose")

const bcrypt=require("bcrypt")
// user model

const userSchema = new mongoose.Schema({
    firstname: {
        type : String,
    },
    lastname :{
        type : String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        select:false,
        type:String
    },

},{
    timestamps:true
})
userSchema.pre("save",async function (next){
    if (this.isModified("password"))
    {this.password=await bcrypt.hash(this.password,10)}
    next()
})
userSchema.methods.verifyPassword=async function(candidatePass,userPass){
    return await bcrypt.compare(candidatePass,userPass)    
}
//convert to model
//export

module.exports = mongoose.model('User', userSchema);