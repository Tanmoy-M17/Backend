const mongoose=require("mongoose");

const socialmediaSchema=mongoose.Schema({
    url:String
},{
    versionKey:false
});

const SocialmediaModel=mongoose.model("socialmedia",socialmediaSchema);

module.exports={
    SocialmediaModel
}