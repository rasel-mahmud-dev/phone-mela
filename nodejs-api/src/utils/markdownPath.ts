import path from "path";


function markdownPath(fileName){
  if(process.env.NODE_ENV === "development" && process.env.NODE_SCOPE === "local") {
    return path.resolve("src/markdowns/" + fileName)
  }
  else {
    return path.resolve("dist/markdowns/" + fileName)
  }
}

export default markdownPath