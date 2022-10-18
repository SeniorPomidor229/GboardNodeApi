require('dotenv').config();
//в файле .env нужно создать TOKEN_SECRET(строка по которой шифруется токен) и TOKEN_LIFE(время жизни токена в секундах)
const secret = process.env.TOKEN_SECRET;
const life_time = process.env.TOKEN_LIFE;

const jwt = require('jsonwebtoken');

//функция для генерация токена доступа
function generateAccessToken(username){
    return jwt.sign({username: username}, secret, {expiresIn: life_time});
}

//функция для декодирования токена(в токене может лежать модификаторы доступа)
function encodeAccessToken(token){
    return jwt.decode(token, {complete: true});
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err) => {
            if (err) {
                console.log(err)
                return res.status(403).json({
                    message: "Неправильно 🐕"
                });
            }

            next();
        });
    } else {
        res.status(401).json({
            message: "Неавторизирован 🐕"
        });
    };
};

exports.authenticateJWT = authenticateJWT;
exports.encodeAccessToken = encodeAccessToken;
exports.generateAccessToken = generateAccessToken;
