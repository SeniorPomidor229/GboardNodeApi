require('dotenv').config();
const connectionString = process.env.MONGOURI;

const { Router } = require('express');
const { mongo } = require('mongoose');

const verify = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(connectionString);

const db = client.db('Gborad');
const collection = db.collection('Tasks');

const router = Router();
//впадлу стало
router.post("/Task/Create",verify.authenticateJWT, async function(req, res){
    if(!req.body.theme || !req.body.title || !req.body.text){
        return res.status(400).json({
            message: "Введите все поля 🐕"
        });
    };

    

    try{
        const task = new Task({
            theme: req.body.theme,
            title: req.body.title,
            text: req.body.text,
            creater_name: req.body.creater_name,
            contractor_names: req.body.contractor_names,
        })
    }
})