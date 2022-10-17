require('dotenv').config();
const connectionString = process.env.MONGOURI;

const bodyParser = require('body-parser');
const express = require('express');
const mongoClient = require('mongodb').MongoClient;

const client = new mongoClient(connectionString);

client.connect(function(err, client){
       
    const db = client.db("admin");
     
    db.command({ping: 1}, function(err, result){
        if(!err){
            console.log("Все заебись");
        }
        else{
            console.log("runtime error: kernel panic, virus in power suply");
            client.close();
        }
    });
});

const app = express();


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})