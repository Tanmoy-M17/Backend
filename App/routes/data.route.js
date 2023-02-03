const express = require("express");
const { DataModel } = require("../models/data.model");
const { verifyRole } = require("../Middlewares/verifytoken");

const datarouter = express.Router();

datarouter.post("/adddata", async (req, res) => {
  const { profile, data, name, email, portfolio,facebook, instagram, linkedin, twitter } =
    req.body;

  try {
    const alldata = new DataModel({
      profile,
      data,
      name,
      email,
      portfolio,
      facebook,
      instagram,
      linkedin,
      twitter,
    });
    await alldata.save();
    res.send({ message: "Data Added Succesfully" });
  } catch (err) {
    res.status(404).send({ message: err });
    console.log(err);
  }
});

datarouter.patch("/updatedata/:id",verifyRole, async (req, res) => {
    const payload=req.body;
    const id=req.params.id
    try{
        await DataModel.findByIdAndUpdate({"_id":id},payload);
        res.send({msg:"Data Updated"})
    }catch(err){
        res.status(404).send({message:err})
    }
  });

  datarouter.get("/", async (req, res) => {
    try{
       const data=await DataModel.find()
        res.send({data:data})
    }catch(err){
        res.status(404).send({message:err})
    }
  });


  module.exports={
    datarouter
  }