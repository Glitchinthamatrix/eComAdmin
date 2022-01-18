const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./categoryModel.js');
const { logInRed, logInGreen } = require('../accessories.js');

const productSchema = new Schema({
    name: { type: String, required: [true, 'Every product must have a name'] },
    postedAt: { type: Date, default: new Date() },
    title: { type: String, required: [true, 'Every product must have a title'] },
    productImages: { type: [String], required: [true, 'Every product must have images'] },
    description: { type: String, required: [true, 'Every product must have a description'] },
    categories: { type: [String], required: [true, 'Every product must have categories'] },
    subCategories: { type: [String], required: [true, 'Every product must have subCategories'] },
    tags: { type: [String], required: [true, 'Every product must have tags'] },
    SKU: { type: String, unique: true, required: [true, 'Every product must have an SKU'] },
    inStock: { type: Boolean, required: [true, 'Every product must have a inStock value'] },
    colors: { type: [String], required: [true, 'Every product must have a colors value'] },
    sizes: { type: [String], required: [true, 'Every product must have a sizes value'] },
    regularPrice: { type: Number, required: [true, 'Every product must have a regular price'] },
    salePrice: { type: Number, required: [true, 'Every product must have a sale price'] },
    totalInStock: { type: Number, required: [true, 'Every product must have a totalInStock value'] },
    weight: { type: Number, required: [true, 'Every product must have a weight'] },
    length: { type: Number, required: [true, 'Every product must have a length'] },
    width: { type: Number, required: [true, 'Every product must have a width'] },
    onSale: { type: Boolean, default: false },
    banned: { type: Boolean, default: false },
    hotProduct: { type: Boolean, default: false },
    reviews: [{ type: Schema.ObjectId, ref: 'review' }]
})

// productSchema.pre('save', async function(next) {

//     if (!this.isModified('categories')) {
//         console.log("not modified");
//         next();
//     }
//     var categories = this.categories;
//     categories.forEach(async(cat) => {
//         Category.findOne({ category: cat })
//             .then((recieved) => {
//                 !recieved ? logInRed('Category insertion error') : ''
//                 console.log(`category recieved: `, recieved._id);
//                 console.log("subCats: ", recieved.subCategories);
//                 console.log("tags: ", recieved.tags);
//                 recieved.subCategories.forEach((sub) => {
//                     if (!this.subCategories.includes(sub)) {
//                         this.subCategories.push(sub);
//                         console.log(`added ${sub} subCat to product: `);
//                         console.log(`added: ${this.subCategories}`)
//                     }
//                 });
//                 recieved.tags.forEach((tag) => {
//                     console.log("adding tag ", tag)
//                     if (!this.tags.includes(tag)) {
//                         this.tags.push(tag)
//                         console.log(`added tag : ${this.tags}`)
//                     }
//                 });
//                 this.name = "abracadabra"
//                 console.log("done!")
//                 console.log(`subCats after adding: `, this.subCategories);
//                 console.log(`tags after adding: `, this.tags);
//                 next();
//             })
//             .catch((e) => {
//                 logInRed('Category insertion error');
//                 console.log(e.message);
//             })
//     })
// })

const Product = mongoose.model('Product', productSchema);
module.exports = Product;