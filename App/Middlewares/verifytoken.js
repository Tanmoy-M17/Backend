const jwt = require("jsonwebtoken");
const {Registermodel}=require("../models/register.model")

const verifyRole = async(req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      const userID = decoded.userId;
      const user=await Registermodel.findOne({_id:userID})
      if(user){
        if(user.role=="Admin"|| user.role=="admin"){

          next();
        }
        else{
          res.status(404).send({message:"You Are not authorised"})
        }
      }else{
        res.status(404).send({message:"Please Sign up"})
      }
    } else {
      res.status(404).send({message:"Please Login First"});
    }
  } else {
    res.status(404).send({message:"Please Login First"});
  }
};


const verifyToken = (req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      next();
    } else {
      res.send({message:"Please Login First"});
    }
  } else {
    res.send({message:"Please Login First"});
  }
};

module.exports = {
  verifyRole,verifyToken
};
