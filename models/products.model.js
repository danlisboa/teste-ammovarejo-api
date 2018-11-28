var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
  name: String,
  last_price: Number,
  actually_price: Number,
  short_description: String,
  images: Array
},
{
  timestamps: true
})

module.exports = mongoose.model('Products', ProductSchema);