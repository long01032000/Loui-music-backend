const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://nhatduong982:1.Nhatduong@music.a1kv0.mongodb.net/Music",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("oke");
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  connect,
};
