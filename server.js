require('dotenv').config();
const connectionString = process.env.MONGOURI;

const bodyParser = require('body-parser');
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(connectionString);
const cors = require('cors')

const userRoute = require('./routes/user_routes')
const authRoute = require('./routes/auth_routes')

//эта херня нужна, чтоб фетч запросом с этого адреса не была Cors политика
var corsOption = {
    origin: "http://localhost:8081"
};

//тест конекшена к базе
client.connect(function(_err, client){
       
    const db = client.db("admin");
     
    db.command({ping: 1}, function(err, _result){
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
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(userRoute);
app.use(authRoute);


// "🐕🐕🐕🐕🐕🐕🐕"
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})