const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel.js');
const { logInRed, logInGreen } = require('../accessories.js');

router.route('/')
    .get(async(req, res) => {
        var data = await Category.aggregate([
            { $group: { _id: "$subCategories" } }
        ])
        console.log(data);
    })
router.route("/:category")
    .get(async(req, res) => {
        Category.findOne({ category: req.params.category }, (err, data) => {
            if (err)
             {
                  res.json({ status: 'failure', error: err.message })
             }
            res.json({ status: 'success', data: data.subCategories })
        })
    })

module.exports = router;