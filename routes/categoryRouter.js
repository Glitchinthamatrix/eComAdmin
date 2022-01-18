const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel.js');
const { logInRed, logInGreen } = require('../accessories.js');

router.route('/addCategory')
    .get((req, res) => {
        res.send('get categoris')
    })
    .post((req, res) => {
        console.log('req body: ', req.body);
        var category;
        req.body.category ? category = req.body.category.toLowerCase() : console.log('No category in reqBody')
        var tags;
        req.body.tags ? tags = req.body.tags.map(v => v.toLowerCase()) : console.log('No tags in request body')
        var subCategories;
        req.body.subCategories ? subCategories = req.body.subCategories.map(v => v.toLowerCase()) : console.log('No subCategories in reqBody')

        if (typeof category == 'undefined' || typeof tags == 'undefined' || typeof subCategories == 'undefined' || !category || !subCategories || !tags) {
            logInRed('POST request invalid');
            console.log("req.body: ", req.body);
            res.json({ error: "Invalid HTTP POST Request" });
        } else {
            Category.findOne({ category: req.body.category.toLowerCase() }, (err, doc) => {
                if (err) {
                    res.json({ error: `there was some error while checking for pre-existing category` });
                    logInRed('error in checking for pre-existing categories');
                    console.log('error: ', err)
                } else if (doc) {
                    logInRed('category already exists');
                    res.json({ error: 'category already exists' });
                } else {
                    Category.create({ category: category, tags: tags, subCategories: subCategories })
                        .then((doc, err) => {
                            if (err) {
                                console.log('error: ', err);
                                res.json({ error: err })
                            } else {
                                console.log('doc: ', doc);
                                res.json({ status: 'success' })
                            }
                        })
                }
            })
        }
    });
router.delete('/deleteOne/:id', (req, res) => {
    if (typeof req.params.id != 'undefined' && req.params.id) {
        Category.findOne({ _id: req.params.id }, (err, doc) => {
            if (err) {
                res.json({ error: "DB error on /deleteOne/:id route" })
            } else {
                if (!doc) {
                    res.json({ error: 'Did not get a category with this ID' })
                } else {
                    Category.deleteOne({ _id: doc._id }, (err) => {
                        if (err) {
                            res.json({ error: 'DB error in deleting category' })
                        } else {
                            logInGreen('deleted category')
                            console.log('deleted categiry: ', doc);
                            res.json({ status: "success", resposne: "Category deleted" })
                        }
                    })
                }
            }
        })
    } else {
        res.json({ error: "Category-ID is not defined" })
    }
});
router.route('/getSubCategoriesAndTags/:category')
    .get((req, res) => {
        console.log("getting subs and tags for " + req.params.category + " from mongo")
        Category.findOne({ category: req.params.category })
            .then((cat) => {
                if (cat) {
                    logInGreen("category recieved successfully");
                    res.json({ status: "success", subCategories: cat.subCategories, tags: cat.tags })
                } else {
                    logInRed("could not get category from mongo");
                    res.json({ status: 'failure' })
                }
            })
            .catch((e) => {
                console.log("could not get category from mongo becuase ", e.message)
            })
    })
module.exports = router;