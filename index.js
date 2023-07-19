const mongoose = require("mongoose");
const app = require("./app");

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gitportfolio");
    console.log("DB IS CONNECTED");

    const onListening = () => {
      console.log("Listening on PORT 5000");
    };

    app.listen(5000, onListening);
  } catch (error) {
    console.error("error: ", error);
    throw err;
  }
})();
