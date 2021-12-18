const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, unique: true },
  number: {
    type: String,
    required: true,
    match: /^[+]*[(]{0,1}(\d[\s]?[-\./()]?[\s]?){8,}$/,
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
