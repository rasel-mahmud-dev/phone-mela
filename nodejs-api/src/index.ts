import mongoose from "mongoose";


const App = function (app){
  
  let isDev = process.env.NODE_ENV === "development"
  
  if(isDev){
    require("../src/models")
    const routes = require("../src/routes")
    routes(app)
  } else {
    require("./models")
    const routes = require("./routes")
    routes(app)
  }
  
  const uri = isDev ? "mongodb://127.0.0.1:27017/phone-mela" : process.env.MONGO_DB_URI
  mongoose.connect(uri).then(r=>{
    console.log("database connected.")
  }).catch(ex=>{
    console.log(ex)
    console.log("database not connect")
  })
}
export default  App
module.exports = App