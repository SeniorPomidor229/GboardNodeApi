require('dotenv').config();
const secret = process.env.TOKEN_SECRET;
const life_time = process.env.TOKEN_LIFE;

const jwt = require('jsonwebtoken');

function generateAccessToken(username){
    return jwt.sign({username}, secret, {expiresIn: life_time});
}

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

exports.generateAccessToken = generateAccessToken;
exports.authenticateToken = authenticateToken;