const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categroySchema = new Schema({
    category: { 
        type: String, required: true, unique: true
     },
    subCategories: { 
        type: [String], required: true
     },
    tags: {
         type: [String], required: true 
    },
    chosenBy:{
        type:[String]
    }
})
const Category = mongoose.model('categorie', categroySchema);
module.exports = Category;