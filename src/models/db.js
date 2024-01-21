const mongoose = require("mongoose");
require("dotenv").config();
const db = {};
db.connect = async function () {
  await mongoose.connect(process.env.URL);
  console.log("Connected to database");
};
db.User = require("./User")(mongoose);
module.exports = db;
