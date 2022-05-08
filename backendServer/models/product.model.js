const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  price: { type: Number, required:true, index: true },
  category: { type: String, required: true },
  quantity: { type: Number, required:true },
  imageUrl: { type: String, required: true },
  active: { type: Boolean, default: true }
},
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model('Product', ProductSchema);