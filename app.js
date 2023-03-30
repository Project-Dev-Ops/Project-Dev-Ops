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
const Cart = require("./model/Cart");
const { Order } = require("./model/order");

connect();
app.use(
  session({
    secret: "fsdfds121sdfs1d5sdffsdfs156a",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
    store: MongoStore.create({
      mongoUrl: `mongodb://34.207.227.76:8105/`,
      dbName: "kodnuey",
    }),
  })
);

// set the view engine to ejs
app.set("view engine", "ejs");

//set the bodyParser to express app
app.use(bodyParser.urlencoded({ extended: true }));

//set the serving static files in the express in a directory named public
app.use("/public", express.static("public"));

// set get require
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/html/auth.html");
  // res.render('login')
  // res.sendFile("../html")
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const newUser = await User(req.body);
  await newUser.save();
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user != null) {
    req.session.userId = user.id;
    return res.redirect("/menu");
  } else {
    return res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
  });
  res.redirect("/");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/menu", (req, res) => {
  console.log(req.session.cart);
  res.render("./menu.ejs");
});

app.get("/foodMenu", (req, res) => {
  //   console.log(req.session.cart);
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  // res.send(200)
  res.render("foodMenu.ejs", { cart });
});

app.post("/addToCart", (req, res) => {
  //   const cart = req.session.cart ? req.session.cart : [];
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.add({ ...req.body, id: new Date().getTime() });
  // console.log(cart)

  req.session.cart = cart;
  res.redirect("/foodMenu");
});

app.get("/Appetizers", (req, res) => {
  res.render("Appetizers.ejs");
});
app.get("/Drinks", (req, res) => {
  res.render("Drinks.ejs");
});

app.get("/cart1", (req, res) => {
  res.render("cart1.ejs");
});

app.get("/order", (req, res) => {
  res.render("order");
});

app.get("/information", (req, res) => {
  res.render("information");
});
app.post("/information", async(req,res) =>{
    const cart = new Cart(req.session.cart)
    if(cart.toArray().length == 0) return res.redirect('/menu')
    console.log(req.body);

    
    let items = []
    cart.toArray().forEach( item => {
        items.push( {'name': item.name , 'note': item.note} )
    })

    const payload = {
        owner: req.session.userId,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number ,
        address: req.body.address ,
        items,
        total_price: (items.length * 100)
    }

    const order = new Order(payload);
    await order.save();
    req.session.cart = new Cart({});
    res.redirect('/menu');
    
});

app.get("/tracking/:id", async(req, res) => {
    const id = req.params.id; 
    const order = await Order.findById(id);
    console.log(order)

    res.render("tracking", {order});
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // const oldUser = await User.findOne({ email: email, password: password });

  const newUser = new User({ name: name, email: email, password: password });
  newUser.save();
  req.session.userId = newUser.id;

  res.redirect("/");
  console.log(req.session);
});

app.get("/removeItem", (req, res) => {
  const id = req.query.id;
  //   req.session.cart = cart;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(id);
  req.session.cart = cart;

  res.redirect("/foodMenu");
});

app.listen("3000", function (err) {
  if (!err) {
    console.log("Server is running on port 3000.");
  }
});
