const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const path = require('path');


require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const whitelist = [process.env.FRONTEND]
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      if(process.env.NODE_ENV === "development"){
        callback(null, true) // anyone can access this apis when is development mode
      } else {
        callback(null, {origin: false }) // anyone can access this apis
        // callback(new Error('Not allowed by CORS'))
      }
    }
  }
}
app.use(cors(corsOptions))

const router = express.Router();

if(process.env.NODE_ENV === "development"){
  const mainApp = require("../src")
  mainApp(app)
  
  app.use("/products/", express.static(path.resolve("src/static/products/")))
  app.use("/avatar/", express.static(path.resolve("src/static/avatar/")))
  
} else {
  /**
    When out app are build
  */
  const mainApp = require("../dist")
  
  
  /*? fixed later */
  app.use("/products/", express.static(path.resolve("dist/static/products/")))
  app.use("/avatar/", express.static(path.resolve("dist/static/avatar/")))
  
  router.use("/products/", express.static(path.resolve("dist/static/products/")))
  router.use("/avatar/", express.static(path.resolve("dist/static/avatar/")))


  mainApp(router)
  
  app.get("/", function (req, res){
    res.send("with app /")
  })
  
  // /.netlify/functions
  router.get("/", function (req, res){
    res.send("with router /")
  })
  
  
  // for direct access /.netlify/functions/server/api/brand2
  // router.get("/api/brand2", function (req, res){
  //   res.send(req.url)
  // })
  

  
}


// access if from  /.netlify/functions/server
//   router.get("/", (r, res)=>{
//     res.send("hi")
//   })

// access if from          /
//   app.get("/", (r, res)=>{
//     res.send("ap")
// })



app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda



module.exports = app;
module.exports.handler = serverless(app);

