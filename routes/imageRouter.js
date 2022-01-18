const express = require('express');
const router = express.Router();
const { uploadFile } = require('../server.js');
const { logInRed, logInGreen } = require('../accessories.js');
const path = require('path')
const multer = require('multer');
const fs = require('fs');

//multer config
const productImagesStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${__dirname}/../uploads/productImages`)
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
const uploadProductImages = multer({ storage: productImagesStorage })

//base route
router.get('/', (req, res) => {
    if (req.query.page && req.query.rowsPerPage) {
        const page = req.query.page;
        const rowsPerPage = req.query.rowsPerPage;
        const getRange = (page, rowsPerPage) => { return [(rowsPerPage * (page - 1)) + 1, (page * rowsPerPage)] };
        fs.readdir(__dirname + '/../uploads/productImages', (err, files) => {
            if (err) {
                res.json({ error: err })
            }
            console.log('files: ', files);
            var range = getRange(page, rowsPerPage);
            console.log('range: ', range);
            if (range[0] <= 0) {
                res.json({ error: `Page-Count Must Not Be ${range[0]<0?'A Negative Number':'Zero'}` })
            } else if (range[1] <= 0) {
                res.json({ error: `Rows-Per-page Must Not Be ${range[1]<0?'A Negative Number':'Zero'}` })
            } else {
                var filesToSend = files.slice(range[0] - 1, range[1]);
                console.log('files to send: ', filesToSend);
                console.log(`sending ${filesToSend.length} images to ${req.ip?req.ip:'no request ip'}`);
                res.json({ status: 'success', totalImages: files.length, noOfFiles: filesToSend.length, files: filesToSend.sort() })
            }
        })
    } else {
        console.log('image request without reqqueries')
        fs.readdir(__dirname + '/../uploads/productImages', (err, files) => {
            if (err) {
                console.log('fetchImage error on GET /images', err)
                res.json({ error: err.message })
            } else {
                console.log('fetch images rquest on GET /images, sending the files ', files)
                res.json({ status: 'success', noOfFiles: files.length, files: files })
            }
        })
    }
});
//uploadImages route
router.post('/uploadImages', uploadProductImages.array('images'), (req, res) => {
    console.log('recieved on /uploadImages');
    var fileAddrs = [];
    req.files.forEach((file) => {
        fileAddrs.push(__dirname + "../uploads/productImages/" + file.originalname)
    })
    res.json({ status: 'success', noOfFiles: req.files.length, fileAddrs: fileAddrs })
});
//deleteImage route
router.post('/deleteImage/:filename', (req, res) => {
    console.log('request on deleteImage route')
    let filePath = path.join(__dirname, '../uploads/productImages/');
    fs.unlink(`${filePath}${req.params.filename}`, (err) => {
        if (err) {
            console.log('error deleting file: ', err)
            res.json({ error: err.message })
        } else {
            res.json({ status: 'success', message: `deleted ${req.params.filename}` })
        }
    })
});
//getImage route
router.get('/getProductImage/:filename', (req, res) => {
    console.log('request on getImage route')
    let filePath = path.join(__dirname, '../uploads/productImages/');
    const stream = fs.createReadStream(`${filePath}${req.params.filename}`)
    stream.pipe(res);
    //logging message
    console.log('image getting streamed')
})
module.exports = router;