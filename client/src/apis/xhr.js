let baseU = ""
let withCredential = false
let headers = []

class xxhr{ 
  constructor(){
    this.get = this.get
    this.post = this.post
    this.common = this.common
  }
  
  static create(options){
    const { baseURL, withCredentials, headers:header } = options
    baseU = baseURL
    withCredential = withCredentials
    headers = header
    return new this 
  }

  common(url, data, resolve, reject, method){
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if(xhr.response){
            resolve(JSON.parse(xhr.response))
          }else {
            resolve("")
          }
        } else {
          reject("There was a problem with the request.")
        }
      }
    }

    xhr.onerror = function() { // only triggers if the request couldn't be made at all
      console.log(`Network Error`);
    };

    xhr.onprogress = function(event) { // triggers periodically
      // event.loaded - how many bytes downloaded
      // event.lengthComputable = true if the server sent Content-Length header
      // event.total - total number of bytes (if lengthComputable)
      console.log(`Received ${event.loaded} of ${event.total} -- ${url} `);
    };

    if(withCredential){
      xhr.withCredentials = true
    }
    xhr.open(method, url, true);
    headers && headers.length > 0 && headers.forEach(c=>{
      for (const key in c) {
        xhr.setRequestHeader(key, c[key]);
      }
    })

    if (data) {
      xhr.send(data)
    } else {
      xhr.send(null)
    }
  }
  
  //? POST Request...........
  post(path, data){
    return new Promise((resolve, reject)=>{
      this.common(baseU + path, data, resolve, reject, "POST")
    })
  }

  //? GET Request...........
  get(path){
    return new Promise((resolve, reject)=>{
      this.common(baseU + path, null, resolve, reject, "GET")
    })
  }

  //? PUT Request...........
  put(path){
    return new Promise((resolve, reject)=>{
      this.common(baseU + path, null, resolve, reject, "PUT")
    })
  }

  //? DELETE Request...........
  delete(path){
    return new Promise((resolve, reject)=>{
      this.common(baseU + path, null, resolve, reject, "DELETE")
    })
  }

}

export default xxhr
