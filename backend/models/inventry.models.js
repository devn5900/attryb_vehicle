const mongoose= require("mongoose");

const inventrySchema= mongoose.Schema({
    // e KMs on Odometer, Major Scratches,
    // Original Paint, Number of accidents reported, Number of previous buyers, Registration Place 
        dealerId:{type:"ObjectId",ref:"users"},
        oemSpecs:{type:"ObjectId",ref:"oemSpecs"},
        title:{type:String,required:true},
        image:{type:String,default:null},
        desc:[{type:String,required:true}],  
        runningKM:{type:String,required:true},
        scratches:[{type:String,required:true}],
        orignalColors:[{type:String,required:true}],
        noOfAccidents:[{type:String,required:true}],
        noOfBuyers:[{type:String,required:true}],
        regPlace:{type:String,required:true},
},{
    versionKey:false
})


const InventryModel=mongoose.model("inventries",inventrySchema);


module.exports={
    InventryModel
}