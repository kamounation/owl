const { mongoose } = require('../../index');

const schema = new mongoose.Schema(
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

module.exports = mongoose.model('User', schema);
