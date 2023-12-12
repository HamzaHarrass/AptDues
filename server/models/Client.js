const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  nom: { 
    type: String,
     required: true 
    },
  prenom: { 
    type: String, 
     required: true 
    },
  telephone: {
    type: Number,
     required: true 
    },
  cin: { 
    type: String, 
     required: true 
},
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;