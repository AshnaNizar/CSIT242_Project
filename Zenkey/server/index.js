var express = require("express");
var cors = require("cors"); // Import the cors middleware
var app = express();
var port = 8000;

// Enable CORS for all origins
app.use(cors());

// Define routes
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile("Landing.html", { root: "public/" });
});

app.get("/Landing.html", function(req, res) {
  res.sendFile("Landing.html", { root: "public/" });
});

app.get("/Signup.html", function(req, res) {
  res.sendFile("Signup.html", { root: "public/" });
});

app.get("/Login.html", function(req, res) {
  res.sendFile("Login.html", { root: "public/" });
});

app.get("/Home.html", function(req, res) {
  res.sendFile("Home.html", { root: "public/" });
});

app.get("/Products.html", function(req, res) {
  res.sendFile("Products.html", { root: "public/" });
});

app.get("/Product-view.html", function(req, res) {
  res.sendFile("Product-view.html", { root: "public/" });
});

app.get("/Cart.html", function(req, res) {
  res.sendFile("Cart.html", { root: "public/" });
});

app.get("/Checkout.html", function(req, res) {
  res.sendFile("Checkout.html", { root: "public/" });
});

app.get("/Account.html", function(req, res) {
  res.sendFile("Account.html", { root: "public/" });
});

// Start the server
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
