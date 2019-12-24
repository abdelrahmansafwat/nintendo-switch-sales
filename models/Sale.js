const mongoose = require("mongoose");
require('dotenv').config();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

let saleSchema = new Schema({
    game: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    },
    schedule: {
        type: Date,
        required: true
    }
});

let Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
  