const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    foods: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'foods' }]
});

const Category = mongoose.model('categories', CategorySchema);
module.exports = Category;