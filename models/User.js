const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
   login: String,
   password:  String
  },
  {timestamps: true}
)

module.exports = model('User', UserSchema)