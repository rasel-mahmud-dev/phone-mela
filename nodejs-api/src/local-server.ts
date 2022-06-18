
const app = require("../functions/server")

// const liveReload = require("livereload");
// const connectLiveReload = require("connect-livereload");
//
// const liveReloadServer = liveReload.createServer()
// liveReloadServer.watch(path.join(__dirname, 'views'));
//
// liveReloadServer.server.once("connection", ()=>{
//   setTimeout(()=>{
//     liveReloadServer.refresh("/")
//   }, 5)
// })
// app.use(connectLiveReload())


// app.use("/.netlify/functions/server/static/", express.static(path.resolve("src/public")))


// import routes from "../src/routes"
// routes(app)

const PORT = process.env.PORT || 1000




app.listen(PORT, "0.0.0.0", () => console.log("server is running on port 1000"))

