require('dotenv').config();
const connectionString = process.env.MONGOURI;

const { Router } = require('express');
const { mongo } = require('mongoose');
const User = require('../models/User.js');
const verify = require('../middleware/authMiddleware')

const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(connectionString);
const db = client.db('Gboard');
const collection = db.collection('Users');

const router = Router();

//эта хрень работает с обработками, стоит менять только при расширении млжелей
router.post("/Create/User", async function (req, res){
  if (!req.body.phone || !req.body.email || !req.body.password){
    return res.status(400).json({
      message: "Введите все поля 🐕"
    });
  };

  const user = await collection.findOne({ phone: req.body.phone, email: req.body.email });
  if (user != null){
    return res.status(400).json({
      message: "Такой пользователь уже есть 🐕"
    })
  }

  try {
    const newUser = new User({
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      role: "user"
    });
  
    await collection.insertOne(newUser, function(err, result){
    if (err){
      res.status(400).send("Все гавно блять 🐕");
    } else{
      console.log(`🐕🐕🐕🐕🐕 ${result.insertedId}`);
      res.status(200).send(`Пользователь создан его _id:${result.insertedId}`);
    }
    });

  } catch (e){
    res.status(400).send(`Ошибка: ${e}`)
  }
});

router.get("/User/:id", verify.authenticateJWT, async function(req, res){
  if (!req.params){
    return res.status(400).json({
      message: "Введите параметр 🐕"
    });
  };

  const objId = mongo.ObjectId(req.params);
  var user = await collection.findOne({_id:objId});
  if (user == null){
    return res.status(403).json({
      message: "Такого пользователя нет 🐕"
    });
  };

  return res.status(200).json({
    data: user
  });
});



module.exports = router;