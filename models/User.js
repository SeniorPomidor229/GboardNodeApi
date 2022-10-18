const { Schema, model } = require('mongoose');

//добавил роли, хз енумы работают или нет, но в документации сказано что работают
const UserSchema = new Schema(
  {
    phone: String,
    email: String,
    password:  String,
    role:{
      type: String,
      enum: ["user","admin","contractor"],
      default: "user"
    }
  },
  {timestamps: true}
);


module.exports = model('User', UserSchema);