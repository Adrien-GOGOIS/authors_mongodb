const mongoose = require("mongoose");

// Créer un schéma (fais office de validation)
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  books: {
    type: [String],
    required: true,
  },
});

// créer un modèle
const Author = mongoose.model("Author", authorSchema);
// --> Crée la collection 'authors'

// exporter le modèle
module.exports = Author;
