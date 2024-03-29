require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");

const app = express();

//middlewear
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, res.method);

  next();
});

//end points
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);

//port
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connect to db and server run on ${PORT} port`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
