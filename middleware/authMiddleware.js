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

//функция (параметры в роуте) для проверки токена
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, secret, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}

exports.encodeAccessToken = encodeAccessToken;
exports.generateAccessToken = generateAccessToken;
exports.authenticateToken = authenticateToken;