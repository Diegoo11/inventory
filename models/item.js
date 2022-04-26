const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  cost: {type: Number, required: true},
  isbn: {type: String, required: true},
  img: {type: String, required: true}
});

ItemSchema.virtual('url').get(function () {
  return '/catalog/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema)
