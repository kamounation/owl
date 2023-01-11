const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    age: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      default: 'Nigeria',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', schema);
