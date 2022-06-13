import * as fs from "fs";
import path from "path";

export let logPath =( process.env.NODE_ENV === "development" && process.env.NODE_SCOPE === "local")
  ? path.resolve("src/logs")
  :path.resolve("dist/logs")



async function createLogger(message: string){
  
  let logPath = path.resolve("dist/logs")
  if(process.env.NODE_ENV === "development" && process.env.NODE_SCOPE === "local") {
    logPath = path.resolve("src/logs")
  }
  
  try {
    await fs.promises.stat(logPath)
    fs.writeFile(path.resolve(logPath + "/s.txt"), message, (err) => {
      console.log(err)
    })
  
  }catch (ex){
    fs.promises.mkdir(logPath).then(r => {
      fs.writeFile(path.resolve(logPath +"/s.txt"), message, (err)=>{
        console.log(err)
      })
    })
  }
  
}

export default createLogger
