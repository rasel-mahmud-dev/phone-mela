
import { baseUri  } from "src/apis/api"



function fullLink(link){
  

  if(link) {
    if (link.indexOf("http") !== -1) {
      if(import.meta.env.MODE !== "development"){
        let a = link.indexOf("phone_mela")
        return baseUri + "/" + link.slice(a+11)
      } else {
        return link
      }
    } else {
      return baseUri + '/' + link
    }
  } else {
    return  ""
  }
}
export default fullLink