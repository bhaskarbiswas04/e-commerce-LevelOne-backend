const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String, // "Men", "Women", etc
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
