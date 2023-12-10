const mongoose = require("mongoose");

const mongoDBUrl = "mongodb://localhost:27017/SIH";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successful");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

connectToDatabase();
