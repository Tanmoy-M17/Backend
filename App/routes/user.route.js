const express = require("express");
const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");
const { verifyRole, verifyToken } = require("../Middlewares/verifytoken");
const { Registermodel } = require("../models/register.model");
const userrouter = express.Router();

userrouter.get("/", async (req, res) => {
  const users=await Registermodel.find()
  res.send({user:users})
});


//-----------------Register A user -----------------
userrouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkemail = await Registermodel.find({ email });
    if (checkemail.length>0) {
      res.send({ message: "You Are Already Registered" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const user = new Registermodel({ email, password: hash, name });
          await user.save();
          res.send({message:"Registered Succesfully"});
        }
      });
    }
  } catch (err) {
    res.send({message:err});
    console.log(err);
  }
});
//--------------Login A user-------------------
userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Registermodel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          if (user[0].token) {
            res.send({ message: "You are already Login" });
          } else {
            var token = jwt.sign({ userId: user[0]._id }, "masai");
            user[0].token = token;
            await user[0].save();
            res.cookie("auth", token).json({
              isAuth: true,
              role: user[0].role,
              id:user[0]._id,
              token: token,
              message: "Login SuccesFully",
            });
          }
        } else {
          res.status(404).send({message:"Email or Password is Wrong"});
        }
      });
    } else {
      res.status(404).send({message:"Plaese Register First"});
    }
  } catch (err) {
    res.send({message:err});
    console.log(err);
  }
});
// ---------------------Add Admin-------------------------
userrouter.post("/addadmin", verifyRole, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const checkemail=await Registermodel.find({email})

    if(checkemail.length>0){
      res.send({message:"You are alraedy registered"})
    }
    else{
       bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new Registermodel({ email, password: hash, name, role });
        await user.save();
        res.send({message:"Admin Added"});
      }
    });
    }
  } catch (err) {
    res.send({message:err});
    console.log(err);
  }
});
// ------------------------Logout A user------------------------
userrouter.get("/logout", verifyToken, async (req, res) => {
  const token = req.headers.auth;
  const user = Registermodel.findOne({ token });
  user.updateOne({ $unset: { token: 1 } }, (err) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send({ message: `Logout Successfully` });
    }
  });
});



module.exports = {
  userrouter,
};
