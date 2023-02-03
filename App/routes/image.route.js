const express = require("express");

const { verifyRole } = require("../Middlewares/verifytoken");
const { ImageModel } = require("../models/images.model");

const imagerouter = express.Router();

imagerouter.post("/addimage", async (req, res) => {
  const { url } =req.body;
  try {
    const image = new ImageModel({ url });  
    await image.save();
    res.send({ message: "Image Added Succesfully" });
  } catch (err) {
    res.status(404).send({ message: err });
    console.log(err);
  }
});

imagerouter.patch("/updateimage/:id",verifyRole, async (req, res) => {
    const payload=req.body;
    const id=req.params.id
    try{
        await ImageModel.findByIdAndUpdate({"_id":id},payload);
        res.send({msg:"Data Updated"})
    }catch(err){
        res.status(404).send({message:err})
    }
  });

  imagerouter.get("/", async (req, res) => {
    try{
       const data=await ImageModel.find()
        res.send({data:data})
    }catch(err){
        res.status(404).send({message:err})
    }
  });

  module.exports={
    imagerouter
  }