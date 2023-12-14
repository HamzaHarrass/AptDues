// models/appartement.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appartementSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'under maintenance'], 
    default: 'available', 
    required: true,
  },
});

const Appartement = mongoose.model('Appartement', appartementSchema);

module.exports = Appartement;