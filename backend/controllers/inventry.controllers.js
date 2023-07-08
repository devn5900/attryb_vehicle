const { InventryModel } = require("../models/inventry.models")

const postInventry=async(req,res)=>{
    const {userId,oemSpecs,title,image,desc,runningKM,scratches,orignalColors,noOfAccidents,noOfBuyers,regPlace}= req.body
    try {
        const saveData = new InventryModel({dealerId:userId,title,image,desc,oemSpecs,runningKM,scratches,orignalColors,noOfAccidents,noOfBuyers,regPlace});
        const isSave= await saveData.save();
        console.log(req.body);
        return res.status(201).json({msg:"Data Saved !",data:req.body});
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error !"})
        
    }
}

const getInventry=async(req,res)=>{
    const {price, colors, mileage}= req.query;
    console.log(price);
    const {userId,dealerName}= req.body;
    const query={dealerId:userId};
    if(price){
        query.price=price;
    }
    if(colors){
        query.orignalColors={ $in: new RegExp(colors,"i") };
    }
    console.log(query);
    try {
        const status= await InventryModel.find(query).populate("oemSpecs").exec();
        if(mileage){
            const milReg= new RegExp(mileage);
            const filtered = status.filter(data => {
                return  milReg.test(data.oemSpecs.mileage);
              });
              return res.status(200).json({data:filtered});
        }else{

            return res.status(200).json({data:status});
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteInventry=async(req,res)=>{
    const {userId,dataId}= req.body;
    const query=dataId.map(el=>{
        let obj={}
        obj._id=el;
        return obj
    })
    try {
        await InventryModel.findOneAndDelete({dealerId:userId},{$and:query});
        return res.status(200).json({msg:"Item Deleted !"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Internal Server Error !"})
    }
}
const editInventry=async(req,res)=>{
    const {userId,title,desc,runningKM,scratches,orignalColors,noOfAccidents,noOfBuyers,regPlace}= req.body;
    const {dataId}= req.params;
    const query= {};
    if(title){
        query.title=title
    }
    if(desc){
        query.desc=desc;
    }
    if(runningKM){
        query.runningKM=runningKM;
    }
    if(scratches){
        query.scratches=scratches
    }
    if(noOfBuyers){
        query.noOfBuyers=noOfBuyers
    }
    if(regPlace){
        query.regPlace=regPlace;
    }
    if(orignalColors){
        query.orignalColors=orignalColors;
    }
    if(noOfAccidents){
        query.noOfAccidents=noOfAccidents
    }
    try {
        const status= await InventryModel.findOneAndUpdate({dealerId:userId,_id:dataId},query,{new:true});
        return res.status(201).json({data:status});
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error !"})
        
    }
}
module.exports={
    postInventry,
    getInventry,
    deleteInventry,editInventry
}