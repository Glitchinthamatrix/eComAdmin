const express = require('express');
const router = express.Router();
const Product = require('../models/productModel.js');
const multer = require('multer');
var excelParser = new(require('simple-excel-to-json').XlsParser)();
const path = require('path');
const fs = require('fs');
const utilities = require('../utilities');
const { logInRed, logInGreen } = require('../accessories.js');
const validNamePattern = utilities.validNamePattern;


const productImagesStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${__dirname}/../uploads`)
    },
    filename: function(req, file, cb) {
        var now = new Date();
        now = now.getTime();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, now + path.extname(file.originalname))
    }
})
const uploadProductImages = multer({ storage: productImagesStorage })

router.route('/')
    .get((req, res) => {
        Product.find()
            .then((prods) => {
                if (!prods) {
                    res.json({ error: "can't fetch products" })
                } else {
                    res.json({ products: prods, total: prods.length, status: 'success' })
                }
            })
            .catch((e) => { res.json({ error: e.message }) })
    });

router.route('/uploadOne')
    .post(async(req, res) => {
        Product.findOne({ SKU: req.body.SKU.trim() })
            .then((doc) => {
                if (doc) {
                    res.json({ error: 'The SKU Already Exists' });
                } else {
                    var newProd = new Product({});
                    for (let key in req.body) {
                        newProd[`${key}`] = req.body[`${key}`]
                    };
                    newProd.save()
                        .then((prod) => {
                            if (!prod) {
                                res.json({ status: 'failure', error: 'Could not create the product' })
                            } else {
                                res.json({ status: 'success' })
                            }
                        })
                        .catch(e => {
                            res.json({ status: 'failure', error: e.message })
                        })
                }
            })
    });
router.route('/uploadExcel')
    .post(uploadProductImages.any(), (req, res) => {
        var theFile = req.files[0]
        if (!theFile || theFile === null || typeof theFile == 'undefined') {
            res.json({ error: 'Could not get the file' })
        } else {
            var doc = excelParser.parseXls2Json(path.join(__dirname, `../uploads/${req.files[0].filename}`));
            if (doc.length <= 1) {
                var arraySorted = false;
                while (!arraySorted) {
                    if (doc.length <= 1) {
                        arraySorted = false
                        doc = doc[0]
                    } else {
                        arraySorted = true;
                    }
                }
            }
            if (doc.length <= 1) {
                res.json({ error: 'could not convert your file to json' });
            } else {
                console.log('starting loop')
                doc = [doc[0]]
                doc.forEach((prod) => {
                    Object.keys(prod).forEach((key) => {
                        var passed = validNamePattern.test(key);
                        if (passed) {
                            console.log('key valid: ', key)
                        } else {
                            console.log()
                            var value = prod[key];
                            var newKey = key.replace(/[^\w\s\_]/gi, '');
                            delete prod[key];
                            prod[newKey] = value;
                        }
                    })
                })
                console.log('sorted prods: ', doc)
                var totalUploads = 0;
                doc.forEach((prod, index) => {
                    var newProd = new Product({});
                    //setting name
                    newProd.name = prod.post_name ? prod.post_name : 'nonameavilable';
                    //setting title
                    newProd.title = prod.post_name ? prod.post_name : 'notitleavailable';
                    //setting productImages
                    newProd.productImages = prod.images ? prod.images.split('|') : ['noimagesavialable'];
                    //setting description
                    newProd.description = prod.post_content ? prod.post_content : 'nodescavailable';
                    //setting categories
                    newProd.categories = prod.taxproduct_cat ? prod.taxproduct_cat.split('>') : ['nocatsavailable'];
                    //setting SKU
                    newProd.SKU = prod.sku ? prod.sku : 'noskuavailable';
                    //setting if in stock
                    newProd.inStock = prod.stock_status == 'instock' ? true : false;
                    //setting colors
                    newProd.colors = prod.attributepa_color ? prod.attributepa_color.split(',') : ['nocoloravailable'];
                    //setting sizes
                    newProd.sizes = prod.attributepa_size ? prod.attributepa_size.split('|') : ['nosizeavailable'];
                    //setting regular price
                    newProd.regularPrice = prod.regular_price ? prod.regular_price : 0;
                    //setting sale price
                    newProd.salePrice = prod.sale_price ? prod.sale_price : 0;
                    //setting total in stock
                    newProd.totalInStock = prod.stock ? prod.stock : 0;
                    //setting width
                    newProd.width = prod.width ? prod.width : 0;
                    //setting weight
                    newProd.weight = prod.weight ? prod.weight : 0;
                    //setting length
                    newProd.length = prod.length ? prod.length : 0;

                    console.log('saving ', newProd);
                    newProd.save()
                        .then((prod) => {
                            if (!prod) {
                                console.log('could not create product');
                                res.json({ error: `could not create product with id: ${prod.sku}` })
                            } else {
                                console.log((index + 1) + ' products created');
                                totalUploads = totalUploads + 1;
                            }
                        })
                        .catch((e) => { res.json({ error: e.message }) })
                })
                console.log('now')
                console.log(totalUploads + " uploaded successfully");
                res.json({ status: 'success', message: `${totalUploads} products created successfully` })
            }
        }
    });

router.route('/delete/:id')
    .delete((req, res) => {
        Product.deleteOne({ _id: req.params.id })
            .then((resp) => {
                if (!resp) {
                    logInRed("could not delete product")
                    res.json({ status: 'failure' })
                } else {
                    logInGreen("deleted product");
                    console.log("with ", req.params.id);
                    console.log('mongoose response: ', resp)
                    res.json({ status: 'success' });
                }
            })
            .catch((e) => {
                res.json({ status: 'failure', error: e.message })
                console.log('error in deleting product: ', e.message)
            })
    });

router.route('/:id')
    .get((req, res) => {
        Product.findOne({ _id: req.params.id })
            .then((prod) => {
                if (prod) {
                    res.json({ status: 'success', product: prod })
                } else {
                    res.json({ success: "failure", error: 'product could not be found' })
                }
            })
            .catch((e) => {
                res.json({ status: 'failure', error: e.message })
            })
    })
module.exports = router;