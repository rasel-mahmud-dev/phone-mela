function errorMessage(ex){
  let message = ""
  if(ex.response){
    if(ex.response.data && ex.response.data.message){
      message = ex.response.data.message
    } else {
      message = ex.response.data
    }
  } else {
    message = ex.message
  }
  
  return message
}

export default errorMessage