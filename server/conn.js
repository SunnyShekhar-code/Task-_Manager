const mongoose = require("mongoose");

const conn = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (response) console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = { conn };
