const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const Author = require("./models/authorModel");

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Database");
  });

// import tableau d'auteurs
// const authors = require("./authors");

// Page d'accueil
app.get("/", async (req, res, _next) => {
  const authors = await Author.find().select("-__v0");
  res.json(authors);
}); // Comment

app.post("/authors", async (req, res) => {
  console.log(req.body);
  try {
    await Author.create(req.body);
    res.status(201).json({ message: "Author created" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

// // Route pour affichage de l'auteur
app.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.json(author);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

// let books;

// // Route pour affichage du bouquin
app.get("/authors/:id/books", async (req, res) => {
  try {
    books = await Author.findById(req.params.id).select("books");
    res.json(books.books.join(", "));
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

// // Routes JSON
app.get("/json/authors/:id", async (req, res, _next) => {
  try {
    const author = await Author.findById(req.params.id);
    res.json(author);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

// // Route erreur 404
app.get("*", (req, res) => {
  res.status(404).send("Author not found");
});

// démarrage serveur
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
