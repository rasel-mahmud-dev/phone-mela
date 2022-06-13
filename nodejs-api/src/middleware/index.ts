


export function admin(req, res, next){
  if(req.session && req.session.user_id && req.session.role === "admin" ){
    next()
  } else {
    res.status(409).json({message: "Your are not admin"})
  }
}
export function auth(req, res, next){
  if(req.session && req.session.user_id){
    next()
  } else {
    res.status(409).json({message: "Your are Logged"})
  }
}