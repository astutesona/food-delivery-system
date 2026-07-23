const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: { type: String, required: true },
  category: { type: String, default: 'General' },
  rating: { type: String, default: '★★★★★' },
  discount: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
