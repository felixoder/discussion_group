import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const secret = "sudfkhhvwuehfvjbwefjvwefbvuwefgvhqvefbqef";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword, email });
  try {
    await newUser.save();
    res.json("Signup is successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(404, "No User Found"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id, isAdmin: validUser.isAdmin
      },
      secret
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async(req , res , next)=>{
  const {email , name , googlePhotoUrl} = req.body;
  try {
    const user = await User.findOne({email})
    if(user){
      const token = jwt.sign({id:user._id , isAdmin:user.isAdmin}, secret);
      const {password, ...rest} = user._doc;
      res
      .status(200)
      .cookie('access_token',token,{
        httpOnly: true,
      })
      .json(rest)
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8)+
      Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('')+ Math.random().toString(9).slice(-4),
        email , 
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      })
      await newUser.save();
      const token = jwt.sign({id: newUser._id , isAdmin: newUser.isAdmin}, secret);
      const {password, ...rest} = newUser._doc;
      res
      .status(200)
      .cookie('access_token',token,{
        httpOnly: true,
      })
      .json(rest)
    }
  } catch (error) {
    next(error)
    
  }
}