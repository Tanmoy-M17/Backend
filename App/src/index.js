const express=require("express")
const cookieParser = require('cookie-parser')
const {connection}=require("../config/db")
const {userrouter}=require("../routes/user.route");
const { imagerouter } = require("../routes/image.route");
const { datarouter } = require("../routes/data.route");
const app=express();
app.use(express.json())
app.use(cookieParser());
app.use("/user",userrouter)
app.use("/data",datarouter)
app.use("/image",imagerouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log("Server is Connected with Database");
    }catch(err){
        console.log(`Err:${err}`);
    }
    console.log(`Server is running on port 8080`);
})