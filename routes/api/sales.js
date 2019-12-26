const express = require("express");
const router = express.Router();
const { searchForScheduled } = require("../../helpers/helpers");
require('dotenv').config();

const Sale = require("../../models/Sale");

// @route POST api/sales/ad
// @desc Add a sale
// @access Public
router.post("/add", (req, res) => {
    console.log(req.body);
    const newSale = new Sale({
        sales: req.body.sales,
        schedule: req.body.schedule,
        header: req.body.header
    });

    newSale
        .save()
        .then(sale => res.json(sale))
        .catch(err => console.log(err));

    searchForScheduled();
});

module.exports = router;