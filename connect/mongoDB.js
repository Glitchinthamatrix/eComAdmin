const mongoose = require('mongoose');
const { logInRed, logInGreen } = require('../accessories.js');


const connectDB = async(URL) => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
        logInGreen('DB connected successfully')
    } catch (err) {
        logInRed('MongoDB connection error');
        console.log('error: ', err)
    }
}
module.exports = { connectDB: connectDB }