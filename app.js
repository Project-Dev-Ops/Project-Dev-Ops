// import express, body-parser, ejs and lodash to app.js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const lodash = require("lodash");
const { connect } = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { User } = require("./model/user");

connect();
app.use(session({
    secret: 'fsdfds121sdfs1d5sdffsdfs156a',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
    store: MongoStore.create({
    mongoUrl: `mongodb://52.91.178.190:8105/kodnuey`,
    dbName: "kodnuey"
    }),
  }));

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

app.post('/register', async(req , res) => {
    console.log(req.body);
    const newUser = await User(req.body);
    await newUser.save();
    res.redirect('/');

})

app.post('/login', async(req, res) => {
    console.log(req.body);

    // const {newEmail, newPassword, newPasswordVal} = req.body;
    // const oldUser = await User.findOne({ email: email, password: password });
  
    //   if(newPassword == newPasswordVal) {
    //     const newUser = new User({ email: newEmail, password: newPassword});
    //     newUser.save();
    //     req.session.userId = newUser.id;
    //   }else {
    //     console.log('Wrong');
    // }
   
    res.send(200);
  })

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/html/register.html');
});
app.get('/about', (req, res) => {
    res.render('about')
});
app.get('/menu', (req, res) => {
    console.log(req.session.cart)
    res.render('./menu.ejs')
});

app.get('/foodMenu', (req, res) => {
    console.log(req.session.cart)
    res.render('foodMenu.ejs')
});

app.post('/addToCart', (req , res ) => {
    const cart = req.session.cart? req.session.cart : [] ;
    cart.push(req.body);
    // console.log(cart)


    req.session.cart = cart;
    res.redirect('/foodMenu');
})

app.get('/Appetizers', (req, res) => {
    res.render('Appetizers.ejs')
});
app.get('/Drinks', (req, res) => {
    res.render('Drinks.ejs')
});

app.get('/cart1', (req, res) => {
    res.render('cart1.ejs')
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

app.post('/register', async(req, res) => {
    const {name, email, password} = req.body;
    // const oldUser = await User.findOne({ email: email, password: password });
  
      
    const newUser = new User({ name : name ,email :email , password :password });
    newUser.save();
    req.session.userId = newUser.id;
        
    res.redirect('/')
    console.log(req.session);
  })
