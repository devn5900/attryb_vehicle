const { OemModel } = require("../models/oem.models")

const postOem=async(req,res)=>{
    const {modelName,modelYear,price,colors,mileage,bhpPower,maxSpeed}= req.body

    try {
        const saveOem= new OemModel({modelName,modelYear,price,colors,mileage,bhpPower,maxSpeed});
        const isSave= await saveOem.save();
        return res.status(201).json({msg:"Oem Saved !",data:isSave});
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error !"})

    }

}
const getOem=async(req,res)=>{
    try {
        const status= await OemModel.find({});
        res.status(200).json({totalData:status.length,data:status});
    } catch (error) {
        
    }
}
module.exports={
    postOem,getOem
}