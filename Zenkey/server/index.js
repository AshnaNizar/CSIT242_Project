var express = require("express");
var app = express();
var port = 8000;


// Define routes
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile("Landing.html", { root: "public/pages" });
  });

app.get("/Landing.html", function(req, res) {
  res.sendFile("Landing.html", {root: "public/pages"});
});

app.get("/Signup.html", function(req, res) {
    res.sendFile("Signup.html", {root: "public/pages"});
  });
  
  app.get("/Login.html", function(req, res) {
    res.sendFile("Login.html", {root: "public/pages"});
  });

  app.get("/Home.html", function(req, res) {
    res.sendFile("Home.html", {root: "public/pages"});
  });

  app.get("/Products.html", function(req, res) {
    res.sendFile("Products.html", {root: "public/pages"});
  });

  app.get("/Product-view.html", function(req, res) {
    res.sendFile("Product-view.html", {root: "public/pages"});
  });

  app.get("/Cart.html", function(req, res) {
    res.sendFile("Cart.html", {root: "public/pages"});
  });

  app.get("/Checkout.html", function(req, res) {
    res.sendFile("Checkout.html", {root: "public/pages"});
  });

  app.get("/Account.html", function(req, res) {
    res.sendFile("Account.html", {root: "public/pages"});
  });

  


// Start the server
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
