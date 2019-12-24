const express = require("express");
const router = express.Router();
require('dotenv').config();

const Sale = require("../../models/Sale");

// @route POST api/sales/ad
// @desc Add a sale
// @access Public
router.post("/add", (req, res) => {
    const newSale = new Sale({
        game: req.body.game,
        discount: req.body.discount,
        expiration: req.body.expiration,
        schedule: req.body.schedule
    });

    newSale
        .save()
        .then(sale => res.json(sale))
        .catch(err => console.log(err));
});

module.exports = router;