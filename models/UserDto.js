const { Schema, model} = require('mongoose');

//cхема для получения токена(входа в систему)э
//впринципе не нужна просто в других языках используется
const UserDtoSchema = new Schema(
    {
        email: String,
        password: String
    },
    {timestamps: true}
);

module.exports = model('UserDto', UserDtoSchema);