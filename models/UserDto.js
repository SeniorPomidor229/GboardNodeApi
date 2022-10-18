const { Schema, model} = require('mongoose');

const UserDtoSchema = new Schema(
    {
        email: String,
        password: String
    },
    {timestamps: true}
);

module.exports = model('UserDto', UserDtoSchema);