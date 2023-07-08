const mongoose = require("mongoose");
require('dotenv').config();
const connection = async () => {
  try {
    const status = await mongoose.connect(
      process.env.DB_URL
    );
    console.log("Connected to DB...");
  } catch (error) {
    console.log(error)
    console.log("Error while Connecting to DB");
  }
};

module.exports = {
  connection,
};
