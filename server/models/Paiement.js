const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaiementSchema = Schema({
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

const Paiement  = mongoose.model('Facture', PaiementSchema);

module.exports = Paiement ;