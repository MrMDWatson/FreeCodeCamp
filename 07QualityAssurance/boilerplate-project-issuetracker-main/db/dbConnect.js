require('dotenv').config();
const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
};

module.exports = dbConnect;