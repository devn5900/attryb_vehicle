const {Router}= require("express");
const { postInventry, getInventry, deleteInventry, editInventry } = require("../controllers/inventry.controllers");
const { inventryValidation } = require("../middleware/dataValidation.middleware");
const { authentication } = require("../middleware/authentication.middleware");
const { authorization } = require("../middleware/authorization.middleware");
const { uploadImageMiddleware } = require("../middleware/imageUploader.middleware");
const fileUpload= require("express-fileupload");

const inventryRouter= Router();

inventryRouter.post("/add",fileUpload({useTempFiles:true}),authentication,authorization,inventryValidation,uploadImageMiddleware,postInventry)

inventryRouter.get("/get",authentication,getInventry);
inventryRouter.delete("/delete/",authentication,deleteInventry);
inventryRouter.patch("/edit/:dataId",authentication,editInventry);
module.exports={
    inventryRouter
}