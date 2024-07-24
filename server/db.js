const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

module.exports = connectToMongo;