const mongoose=require("mongoose");

const registerSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role: { type: String, default: 'user' },
    token:String
},{
    versionKey:false
});

const Registermodel=mongoose.model("User",registerSchema);

module.exports={
    Registermodel
}