const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const certificateRoutes = require("./routes/certificateRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/certificateDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/certificate", certificateRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
