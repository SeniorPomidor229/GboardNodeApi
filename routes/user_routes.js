require('dotenv').config();
const connectionString = process.env.MONGOURI;

const { Router } = require('express');
const User = require('../models/User.js');
const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(connectionString);

const db = client.db('Gboard');
const collection = db.collection('Users');

const router = Router();

//эта хрень работает с обработками, стоит менять только при расширении млжелей
router.route("/Create/User").post(async function (req, res){
  if (!req.body.phone || !req.body.email || !req.body.password){
    return res.status(400).json({
      message: "Введите все поля"
    });
  };

  const user = await collection.findOne({ phone: req.body.phone, email: req.body.email });
  if (user != null){
    return res.status(400).json({
      message: "Такой пользователь уже есть"
    })
  }

  try {
    const newUser = new User({
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      role: "admin"
    });
  
    await collection.insertOne(newUser, function(err, result){
    if (err){
      res.status(400).send("Все гавно блять");
    } else{
      console.log(`🐕🐕🐕🐕🐕 ${result.insertedId}`);
      res.status(200).send(`Пользователь создан его _id:${result.insertedId}`);
    }
    });

  } catch (e){
    res.status(400).send(`Ошибка: ${e}`)
  }
});



module.exports = router;