console.log("Hello World");
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyparser = require('body-parser');
const connection = require('./database');
const app = express();
require('dotenv').config();
const databaseconn = require('./database');

const port = process.env.PORT || 3001;
console.log(process.env.SECRET_KEY);

app.set('view engine', 'ejs')

const staticPath = path.join(__dirname, "/src");
app.use(express.static(staticPath));

app
    .use(bodyparser.urlencoded({ extended: false}))
    .use(bodyparser.json())

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'));

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`),
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database Connected!');
    }))

app.post('/', function(req, res){
    console.log(req.body.name);

    var sql = "insert into email_list values(null,'"+ req.body.name+"', '"+ req.body.email+"')"
    connection.query(sql, function(err){
        if(err) throw err;
        console.log('Email Sent!');
    })
    // connection.end();
})