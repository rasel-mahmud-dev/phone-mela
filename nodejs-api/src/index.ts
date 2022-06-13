import mongoose from "mongoose";




//local dev
require("../src/models")
import routes from "../src/routes"

const App = function (app, router){
  
  const uri = process.env.NODE_ENV === "development" ? "mongodb://127.0.0.1:27017/phone-mela" : process.env.MONGO_DB_URI
  mongoose.connect(uri).then(r=>{
    console.log("database connected.")
  }).catch(ex=>{
    console.log("database not connect")
  })
  

// access if from          /.netlify/functions/server
//   router.get("/", (r, res)=>{
//     res.send("hi")
//   })

// access if from          /
//   app.get("/", (r, res)=>{
//     res.send("ap")
// })
// routes(router)
  
  routes(app)
}
export default  App
module.exports = App