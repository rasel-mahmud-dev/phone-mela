
import { baseUri  } from "src/apis/api"



function fullLink(link){
  

  if(link) {
      if(import.meta.env.MODE === "development"){
        let a = link.indexOf("phone_mela")
        let aa = baseUri + "/" + link.slice(a+11)
        return aa
      } else {
        return link
      }
  } else {
    return  ""
  }
}

export default fullLink
