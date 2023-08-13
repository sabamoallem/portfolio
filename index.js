const mongoose = require("mongoose");
const app = require("./app");

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gitportfolio", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB IS CONNECTED");

    const onListening = () => {
      console.log("Listening on PORT 4444");
    };

    app.listen(4444, onListening);
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
})();
