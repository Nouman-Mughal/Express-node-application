const mongoose = require("mongoose");
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
    enum: [],
  },
});
genreSchema.virtual("url").get(function () {
  return "./catalog/genre/" + this._id;
});
module.exports = mongoose.model("genre", genreSchema);
