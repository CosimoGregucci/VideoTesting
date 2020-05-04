var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 1000},
    originalLocation: {type: String, required: true},
	modifiedLocations: {type: Array, required: true},
  }
);

// Virtual for video's URL
VideoSchema
.virtual('url')
.get(function () {
  return '/catalog/video/' + this._id;
});

//Export model
module.exports = mongoose.model('Video', VideoSchema);