const { json } = require("express");
const { validateEmail, validateURL } = require("../utills/impFn");

const registerValidation=(req,res,next)=>{
    const {name,email,password,role,location,confirmPass}= req.body;
    if(typeof name!=="string" ||typeof email!=="string"||typeof location!=="string"||typeof password!=="string"||typeof confirmPass!=="string" || password!==confirmPass,typeof role!=="boolean" ){
        return res.status(206).json({msg:"Invalid Data Format"})
    }
    next();
}

const loginValidation=(req,res,next)=>{
    const {email,password}= req.body;
    if(typeof email!=='string'||typeof password!=="string"||!validateEmail(email)||!validateEmail(email)){
        return res.status(206).json({msg:"Please Enter a valid Information "});
    }
    next();
}

const oemValidation=(req,res,next)=>{
    const {modelName,modelYear,price,colors,mileage,bhpPower,maxSpeed}= req.body

    if(typeof modelName!=="string"||typeof modelYear!=="number"||typeof price!=="number"||typeof colors!=="string"||typeof mileage!=="string"||typeof bhpPower!=="string"||typeof maxSpeed!=="string"){
        return res.status(206).json({msg:"Invalid OEM Data !"})
    }
    next();
}
const inventryValidation=(req,res,next)=>{
    if (req.files) {
        image = req.files.image;
        req.body.image = image;
      }
    let {runningKM,title,desc,scratches,orignalColors,noOfAccidents,noOfBuyers,regPlace}= req.body
    scratches= JSON.parse(scratches);
    orignalColors= JSON.parse(orignalColors);
    noOfAccidents= JSON.parse(noOfAccidents);
    noOfBuyers=JSON.parse(noOfBuyers);
    desc=JSON.parse(desc);
    if(typeof runningKM!=="string"||!Array.isArray(scratches)||!Array.isArray(orignalColors)||!Array.isArray(noOfAccidents)||!Array.isArray(noOfBuyers)||typeof regPlace!=="string"||typeof title!=="string"||!Array.isArray(desc)||!image){
        

        return res.status(206).json({msg:"Invalid Inventry Data !"})
    }else{
        next();
    }
}
module.exports={
    registerValidation,
    loginValidation,
    oemValidation,
    inventryValidation
}