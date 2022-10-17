require('dotenv').config();
const connectionString = process.env.MONGOURI;

const { Router } = require('express');
const User = require('../models/User.js');
const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(connectionString);

const db = client.db('Gboard');
const collection = db.collection('Users');

const router = Router();

router.route("/Create/User").post(function async (req, res){
  if (!req.body.login || !req.body.password){
    return res.status(400).json({
      message: "Введите все поля"
      });
  };

  const user = new User({
    login: req.body.login,
    password: req.body.password
  });


  collection.insertOne(user, function(err, result){
    if (err){
      res.status(400).send("Все гавно блять");
    } else{
      console.log(`🐕🐕🐕🐕🐕 ${result.insertedId}`);
      res.status(200).send(`Пользователь создан его _id:${result.insertedId}`);
    }
  });

});



module.exports = router