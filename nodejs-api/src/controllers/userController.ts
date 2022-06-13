

import {NextFunction, Request, Response} from "express";

import {RequestWithSession} from "../types";


export const logout = async (req: RequestWithSession, res: Response, next:NextFunction)=>{
  
  // if(req.session) {
  //   req.session = null
  //   res.status(201).json({message: "You are logout"});
  // }
}