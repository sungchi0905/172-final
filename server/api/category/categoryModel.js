var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  category: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('category', CategorySchema);
