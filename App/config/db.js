const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://tanmoy:tanmoy@cluster0.cmjb5.mongodb.net/agumentic?retryWrites=true&w=majority")


module.exports={
    connection
}