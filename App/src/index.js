const express=require("express")
const cookieParser = require('cookie-parser')
const {connection}=require("../config/db")
const {userrouter}=require("../routes/user.route")
const app=express();
app.use(express.json())
app.use(cookieParser());
app.use("/user",userrouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log("Server is Connected with Database");
    }catch(err){
        console.log(`Err:${err}`);
    }
    console.log(`Server is running on port 8080`);
})