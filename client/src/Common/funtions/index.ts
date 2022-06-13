import api from "apis/api";
import {ProductType} from "reducers/productReducer";


function fetchHomePageSectionProducts(url: string, type: string){
  return new Promise<ProductType[] | null>(async (resolve, reject)=>{
    try {
      const response = await api.post(url, {type})
      if (response.status === 200) {
        resolve(response.data)
      }
      
    }catch (ex){
      resolve(null)
    }
  })
}

export default fetchHomePageSectionProducts