var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VoteSchema = new Schema(
  {
    video: {type: Schema.Types.ObjectId, ref: 'Video', required: true},
	version: {type: Number, required: true},
    vote: {type: Number, required: true},
  }
);

// Virtual for vote's URL
VoteSchema
.virtual('url')
.get(function () {
  return '/catalog/vote/' + this._id;
});

//Export model
module.exports = mongoose.model('Vote', VoteSchema);