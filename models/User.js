const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    phone: String,
    email: String,
    password:  String,
    role: String
  },
  {timestamps: true}
);


module.exports = model('User', UserSchema);