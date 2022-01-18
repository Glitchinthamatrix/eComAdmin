const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: { type: String },
    rating: { type: Number },
    image:{type:[String]},
    createdAt: { type: Date, default: new Date() },
    author: { type: ObjectId, required: [true, 'every reqview schema must have an author'] }
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;