import {getToken, parseToken} from "../jwt";


export function admin(req, res, next){
  
  (async function (){
    try{
      let token = getToken(req)
      if(!token){
        return res.status(404).json({message: "please login first"})
      }
      let data = await parseToken(token)
      if(data && data.userId){
        if(data.role === "admin"){
          next()
        } else {
          res.status(409).json({message: "Your are not admin"})
        }
      } else {
        res.status(409).json({message: "Please login first"})
      }
    } catch (ex){
      res.status(409).json({message: "Please login first"})
    }
  }())
  
  // if(req.session && req.session.user_id && req.session.role === "admin" ){
  //   next()
  // } else {
  //   res.status(409).json({message: "Your are not admin"})
  // }
  
}

export function auth(req, res, next){
  (async function (){
    try{
      let token = getToken(req)
      if(!token){
        return res.status(404).json({message: "please login first"})
      }
      let data = await parseToken(token)
      if(data && data.userId){
        next()
      } else {
        res.status(409).json({message: "your are unauthorized"})
      }
    } catch (ex){
      res.status(409).json({message: "Please login first"})
    }
  }())
  
  
  // if(req.session && req.session.user_id){
  //   next()
  // } else {
  //   res.status(409).json({message: "Your are Logged"})
  // }
}