const {Router}= require("express");
const { register, login } = require("../controllers/users.controllers");
const { registerValidation, loginValidation } = require("../middleware/dataValidation.middleware");

const usersRouter= Router();

usersRouter.post("/register",registerValidation,register)
usersRouter.post("/login",loginValidation,login)



module.exports={
    usersRouter
}