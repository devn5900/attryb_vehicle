const mongoose= require("mongoose");

const oemSchema= mongoose.Schema({
//     name of the model, Year of Model, list price of the new vehicle, available colors,
// mileage as advertised by the manufacturer, Power (in BHP), Max Speed
        modelName:{type:String,required:true},
        modelYear:{type:Number,required:true},
        price:{type:Number,required:true},
        colors:{type:String,required:true},
        mileage:{type:String,required:true},
        bhpPower:{type:String,required:true},
        maxSpeed:{type:String,required:true},
},{
    versionKey:false
})


const OemModel=mongoose.model("oemSpecs",oemSchema);


module.exports={
    OemModel
}