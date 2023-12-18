// const fs = require('fs');
// const PDFDocument = require('pdfkit');
const Paiement = require('../models/Paiement');

const createPaiement = async (req, res) => {
  const {apartmentId, clientId} = req.body;
  try {
    const newPaiement = new Paiement({appartement : apartmentId, client: clientId});
    console.log(newPaiement);
    await newPaiement.save();
    // const doc = new PDFDocument();
    // doc.pipe(fs.createWriteStream(`path/to/pdf/${newPaiement._id}.pdf`));
    // doc.text(`Payment Details:\n\nApartment ID: ${newPaiement.appartement}\nClient ID: ${newPaiement.client}\nDate: ${newPaiement.date}`);
    // doc.end();
    res.status(201).json(newPaiement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPaiements = async (req, res) => {
  try {
    const getPaiements = await Paiement.find().populate('appartement client');
    res.json(getPaiements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.find({appartement:req.params.id}).populate('appartement client');
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement not found' });
    }
    res.json(paiement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaiement = async (req, res) => {
  try {
    const paiement = await paiement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('appartement client');
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement not found' });
    }
    res.json(paiement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePaiement = async (req, res) => {
  try {
    const paiement = await paiement.findByIdAndDelete(req.params.id).populate('appartement client');
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement not found' });
    }
    res.json({ message: 'Paiement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaiement, getAllPaiements, getPaiementById, updatePaiement, deletePaiement };
