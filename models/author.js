const mongoose = require("mongoose");
let AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, manlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});
//virual for Authors full name
AuthorSchema.virtual("name").get(function () {
  let fullName = "";
  if (this.first_name && this.family_name) {
    fullname = this.first_name + "" + this.family_name;
  }
  if (!this.first_name || !this.family_name) {
    fullName = "";
  }
  return fullName;
});
//virtual for Authors lifespan
AuthorSchema.virtual("life_span").get(function () {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string += this.date_of_birth.getYear().toString();
  }
  lifetime_string = "-";
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear();
  }
  return lifetime_string;
});
AuthorSchema.virtual("url").get(function () {
  return "/catalog/Author/" + this._id;
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
