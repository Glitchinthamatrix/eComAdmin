const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const { logInRed, logInGreen } = require('./accessories.js');
const { connectDB } = require('./connect/mongoDB.js');
const Category = require('./models/categoryModel.js');
const bodyParser = require('body-parser')
const catRouter = require('./routes/categoryRouter.js');
const imageRouter = require('./routes/imageRouter.js');
const productRouter = require('./routes/productRouter.js');
const subCategoryRouter = require('./routes/subCategoryRouter.js');
const PORT = process.env.PORT || 9000;
const ARP = require('node-arp');

//middlewares 
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Request in gatekeeper middleware==> ${req.method.toUpperCase()} ${req.url}; req.body: ${req.body?Object.keys(req.body)>0?Object.keys(req.body):'No':'no'} items; `)
    next()
});


//routes
app.use('/categories', catRouter);
app.use('/images', imageRouter);
app.use('/products', productRouter);
app.use('/subCategories', subCategoryRouter);

 
//in-server routes 
app.get('/getCategories', (req, res) => {
    console.log('requset for all categories');
    Category.find({})
        .then((categories) => {
            if (categories) 
            {
                logInGreen("successfully served categories")
                res.json({ status: "success", categories: categories });
            } else
             {
                console.log("could not server categories")
                res.json({ error: "Can't Get Categories" })
            }
        }).catch(e => {
            console.log("could not server categories because ", e.message);
            res.json({ error: e.message })
        })
});

//connection string
var url = `mongodb+srv://Nitesh123:antarcticwolf123@cluster0.dyzrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
connectDB(url);

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'));
}

app.listen(PORT, (err) => {
    if (err) {
        logInRed('Node server initialisation error');
        console.log("error: ", err)
    } else {
        logInGreen('server listening...')
        console.log('on port ', PORT)
    }
})