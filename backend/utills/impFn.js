const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };
const validateURL=(urid)=>{
  try {
    const uri= new URL(urid);
    return true;
} catch (error) {
    console.log(error)
    return false
}
}
  module.exports={
    validateEmail,
    validateURL
  }