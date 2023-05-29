const express = require("express");
const colors = require("colors");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/AuthRouter");

// configure env
dotenv.config();

// database config
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Registration Form Using MERN</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});
