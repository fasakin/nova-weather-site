const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../Utils/geocode");
const forecast = require("../Utils/forecast");

const app = express();

//Define path for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectory);

hbs.registerPartials(partialsDirectory);
//setup static directory to server
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Olaobi Ifedayo Fasakin",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Olaobi Ifedayo Fasakin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Olaobi Ifedayo Fasakin",
    message: "This is the help page",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide your address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (!address) {
      return res.send({ error: "Please provide an address" });
    }
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({ Error: error });
      }
      res.send({
        forecast: forecastdata,
        location,
        address
      });
    });
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article",
    message: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "My 404 Page", message: "My 404 page" });
});
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("server is up on port 3000");
});
