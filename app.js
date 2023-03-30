// import express, body-parser, ejs and lodash to app.js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const lodash = require("lodash");
const { connect } = require("./config/db");

connect();

// set the view engine to ejs
app.set('view engine', 'ejs');

//set the bodyParser to express app
app.use(bodyParser.urlencoded({ extended: true }));

//set the serving static files in the express in a directory named public
app.use('/public', express.static("public"));

// set get require
app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
    // res.render('login')
    // res.sendFile("../html")
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/html/register.html');
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/menu', (req, res) => {
    res.render('menu')
});

app.get('/order', (req, res) => {
    res.render('order')
});


app.get('/information', (req,res) =>{
    res.render('information')
});

app.get('/tracking', (req, res) => {
    res.render('tracking')
});


app.listen('3000', function(err){
    if(!err){
        console.log("Server is running on port 3000.")
    }
})