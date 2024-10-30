const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  licenseNo: { type: String, required: true },
  age: { type: Number, required: true },
  carDetails: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    plateNo: { type: String, required: true }
  }
});

module.exports = mongoose.model('User', UserSchema);
