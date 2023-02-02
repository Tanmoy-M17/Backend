const mongoose=require("mongoose");

const imageSchema=mongoose.Schema({
    url:String
},{
    versionKey:false
});

const ImageModel=mongoose.model("Image",imageSchema);

module.exports={
    ImageModel
}