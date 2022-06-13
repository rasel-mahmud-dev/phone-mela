import mongoose from "mongoose";
import  bcryptjs from "bcryptjs"
import {NextFunction, Request, Response} from "express";
import {UserType} from "../models/User";
import {createToken, getToken, parseToken} from "../jwt";


export const userRegistration = async (req: Request, res: Response)=> {
  
  const { last_name, first_name, email, password } = req.body
  
  
  let User = mongoose.model("User")
  
  try{
    
    let user = await User.findOne({email: email})
    if(user){
      res.status(409).json({message: "user already exists"})
      return
    }
    
    let newUser: UserType  = {
      avatar: "",
      last_name: last_name,
      first_name: first_name,
      username: first_name + " " + last_name,
      email: email,
      password: password,
      role: "user"
    }
    
    let instanceUser = new User(newUser)
    
    await instanceUser.validate();
    let result: any = await instanceUser.save()
    let token = await createToken(instanceUser._id, newUser.role)
    
    res.status(201).json({
      token: token,
      first_name: result.first_name,
      username: result.username,
      email: result.email,
      avatar: result.avatar,
      role: result.role,
    })
    
    
  } catch (error){
    let msg = ""
    if (error.name === "ValidationError") {
      let errors = {};
      
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
        msg = error.errors[key].message
      });
      return res.status(409).json({message: msg, errors: errors})
    }
    res.status(500).json({message:"Something went wrong"});
  }
  
  
}

export const login = async (req: Request, res: Response)=> {
  const {  email, password } = req.body
  
  try{
    let User = mongoose.model("User")
    let user: any = await User.findOne({email: email})
    if(!user){
      return  res.status(404).json({message: "User not registered"})
    }
    
    let isMatch = bcryptjs.compareSync(password, user.password); // true
    if(!isMatch){
      return  res.status(404).json({message: "User password not match"})
    }
    
    
    // req.session.user_id = user._id.toString();
    // req.session.role = user.role;
  
    let token = await createToken(user._id, user.role)
    
    return res.status(201).json({
      token: token,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      role: user.role
    })
    
  } catch (error){
    return  res.status(500).json({message: error.message})
    
    let errors = {}
    
    if (error.name === "ValidationError") {
      let errors = {};
      
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(409).json({message: "", errors: errors})
    }
    res.status(500).send("Something went wrong");
  } finally {
  
  }

}


export const loginCurrentUser = async (req: Request, res: Response)=> {
  
  try{
    let token = getToken(req)
    if(!token){
      return res.status(404).json({message: "please login first"})
    }
    
    let data = await parseToken(token)
    if(data){
      let User = mongoose.model("User")
      let user: any = await User.findOne({_id: data.userId})

      if (!user) {
        return res.status(404).json({message: "User not registered"})
      }


      return res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        avatar: user.avatar,
        role: user.role
      })
    } else {
      return res.status(404).json({message: "please login first"})
    }
    
    
  } catch (error){
    return  res.status(500).json({message: error.message})
    
  } finally {
  
  }

}