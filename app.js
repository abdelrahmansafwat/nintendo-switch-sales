const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const sales = require("./routes/api/sales");
const { searchForScheduled } = require("./helpers/helpers");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/sales", sales);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

searchForScheduled();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Express running: PORT ${port}`);
});