const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session')


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
        callback(null, false) // anyone can access this apis
        // callback(new Error('Not allowed by CORS'))
      }
    }
  }
}
app.use(cors(corsOptions))

app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY],
}))

const router = express.Router();


if(process.env.NODE_ENV === "development"){
  const mainApp = require("../src")
  mainApp(app, router)
  
  app.use("/products/", express.static(path.resolve("src/static/products/")))
  app.use("/avatar/", express.static(path.resolve("src/static/avatar/")))
  
} else {
  /**
    When out app are build
  */
  const mainApp = require("../dist")
  mainApp(app, router)
  app.use("/products/", express.static(path.resolve("dist/static/products/")))
  app.use("/avatar/", express.static(path.resolve("dist/static/avatar/")))
}


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
