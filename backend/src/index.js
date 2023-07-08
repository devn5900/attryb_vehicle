
const express = require("express");
const { connection: dbConnection } = require("../connection/db.connection");
require("dotenv").config();
const cors= require("cors");
const { usersRouter } = require("../routes/users.routes");
const { oemRouter } = require("../routes/oem.routes");
const { inventryRouter } = require("../routes/inventry.routes");
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

/////////////////////////////**Routes**/////////////////////////////////////////

app.use("/user",usersRouter);
app.use("/oem",oemRouter);
app.use("/inventry",inventryRouter)
///////////////////////////////////////////////////////////////////////
app.get("/", (req , res) => {
  res.send("Welcome To Second-Hand Car House");
});
app.get("*", (req, res) => {
  res.send("Not Found");
});
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
  dbConnection();
});
