const {Router}= require("express");
const { postOem, getOem } = require("../controllers/oem.controllers");
const { oemValidation } = require("../middleware/dataValidation.middleware");

const oemRouter=Router();

oemRouter.post("/add",oemValidation,postOem)

oemRouter.get("/get",getOem);


module.exports={
    oemRouter
}