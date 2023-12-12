const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const factureSchema = Schema({
  appartement: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appartement',
     required: true 
    },
  client: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Client', 
      required: true 
    },
  date: {
     type: Date,
      default: Date.now 
    },
});

const Facture = mongoose.model('Facture', factureSchema);

module.exports = Facture;