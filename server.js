require('dotenv').config();
const connectionString = process.env.MONGOURI;

const bodyParser = require('body-parser');
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const todoRoutes = require('./routes/user_routes')
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
app.use(todoRoutes)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.listen(6000, () => {
    console.log(`Server Started at ${6000}`)
})