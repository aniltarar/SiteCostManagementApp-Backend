//database config dosyası
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("*****MongoDB Connection Successful*****");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDatabase;
