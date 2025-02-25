import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js";
export const getUsers =async (req, res, next) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  }


  export const getUserInfo =async (req, res, next) => {
    try {
       console.log(req.user)
       const findUser = await User.findById(req.user.id)
       res.send(findUser);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  }




 
  export const registerUser = async (req, res, next) => {
    try {
      console.log(req.body);
      const { password } = req.body;
      /////  123
      //// 28937429387429387428937429374273428wkfljsklcvjsdklcsjv
      //// kjclwuiehf27yr23ry42893ry2893yr293y923yr4293r928rh92r8
      /////adadf;fmewvgklmregn 389t34nfiewvnf9weivnjiwevmfoiwevgv
      /////
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);
      /// replacing it with the raw password
      //// after that save it in database
      const userData = {
        ...req.body,
        password: hashPassword,
      };
      console.log("userdaa", userData);
      const newUser = await User.create(userData);
      res.status(201).send(newUser);
    } catch (error) {
      next({ status: 400, message: error.message });
    }
    ////
  }


 export const login =  async (req, res, next) => {
    const { email, password } = req.body;
    ///// 1. first if the email exist in ur databas
  
    const findUser = await User.findOne({ email });
    console.log(findUser);
    if (!findUser) {
      next({ status: 401, message: "Invalid    Credentila " });
      return;
    }
  
    const comparePasswords = await bcrypt.compare(password, findUser.password);
    console.log(comparePasswords);
    if (!comparePasswords) {
      next({ status: 401, message: "Invalid    Credentila " });
      return;
    }
    const token = jwt.sign(
      {
        id: findUser._id,
        email: findUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    
   

    res.send({ message: "successfully logged in",user:findUser});
 }


export const googleLogin =async(req,res,next)=>{
  try {

    console.log(req.body)
    const config ={
      headers:{
        Authorization:`Bearer ${req.body.accessToken}`
      }
    }
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo",config)
    const result = await response.json()
    console.log(result) 

    ////save the user in the database
    /// create jwt token and send it to the cookie  
    



    res.send({message:"ok"})
    
  } catch (error) {
    next({ status: 401, message: error.message });
  }
} 
 
 
 
 export const logout = async(req,res,next)=>{
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });
  res.send({ message: "Successfully logged out" });

 }