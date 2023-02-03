const { default: mongoose } = require("mongoose");
const monggose=require("mongoose");

const dataSchema=monggose.Schema({
    profile:String,
    data:String,
    name:String,
    email:String,
    portfolio:String,
    facebook:String,
    instagram:String,
    linkedin:String,
    twitter:String
})

const DataModel=mongoose.model("data",dataSchema);

module.exports={
    DataModel
}