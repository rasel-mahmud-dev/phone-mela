
import { baseUri  } from "src/apis/api"

function fullLink(link){
  if(link.indexOf("http") !== -1){
    return link
  } else {
    return baseUri + '/' + link
  }
}
export default fullLink