const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // matches frontend id
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  category: {
    type: String, // "Men", "Women", "Kids", "Electronics"
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;