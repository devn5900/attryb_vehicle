const { UsersModel } = require("../models/users.models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { name, email, password, location, role, confirmPass } = req.body;

  try {
    const isExists = await UsersModel.findOne({ email });
    if (isExists) {
      return res
        .status(208)
        .json({ msg: "Email Already has been registerd !" });
    } else {
      bcrypt
        .hash(password, +process.env.KEY_SALTING)
        .then(async (hash, err) => {
          console.log(err, hash);
          if (!err && hash) {
            let password = hash;
            const saveUser = new UsersModel({
              name,
              email,
              location,
              password,
              role: role ? "Dealer" : "Customer",
            });
            const isSave = await saveUser.save();
            return res.status(201).json({ msg: "Now, You are registered !" });
          } else {
            return res.status(203).json({ msg: "Invalid Data Format" });
          }
        });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExists = await UsersModel.findOne({ email });
    if (isExists) {
      bcrypt.compare(password, isExists.password).then((isValid) => {
        if (isValid) {
          return res
            .status(200)
            .json({
              msg: "Login Successfull",
              token: jwt.sign(
                { userId: isExists._id, userName: isExists.name,role:isExists.role },
                process.env.PRIVATE_KEY
              ),
            });
        } else {
          return res.status(200).json({ msg: "Incorrect Password" });
        }
      });
    } else {
      return res
        .status(203)
        .json({
          msg: "You are not registered. Please Register yourself first",
        });
    }
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
