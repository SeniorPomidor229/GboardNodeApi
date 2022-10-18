require('dotenv').config();
const connectionString = process.env.MONGOURI;

const { Router } = require('express');
const jwt = require('../middleware/authMiddleware').generateAccessToken;

const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(connectionString);


const db = client.db('Gboard');
const collection = db.collection('Users');

const router = Router();

//endpoint для входа, впринципе работает
router.route("/Token").post(async function (req, res){
    if (!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Введите все поля 🐕"
        });
    };

    const user = await collection.findOne({ email: req.body.email });
    if (user == null){
        return res.status(400).json({
            message: "Такого пользователя нет 🐕"
        });
    };

    const token = jwt(req.body.email);

    return res.status(200).json({
        accsess_token: token
    });
});

module.exports = router;