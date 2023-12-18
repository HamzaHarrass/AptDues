const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');  
const Paiement = require('../models/Paiement');
const Appartement = require('../models/Appartement');
const Client = require('../models/Client');


const createPaiement = async (req, res) => {
  const { apartmentId, clientId } = req.body;
  try {
    const newPaiement = new Paiement({ appartement: apartmentId, client: clientId });
    await newPaiement.save();

    const appartementDetails = await Appartement.findById(apartmentId);
    const clientDetails = await Client.findById(clientId);

    const pdfDir = path.join(__dirname, 'path', 'to', 'pdf');

    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    const doc = new PDFDocument();
    const pdfPath = path.join(pdfDir, `${newPaiement._id}.pdf`);
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.text(`Payment Details:`);
    doc.text(`\nApartment Address: ${appartementDetails.address}`);
    doc.text(`Apartment Price: ${appartementDetails.prix}`);
    doc.text(`Client Name: ${clientDetails.prenom} ${clientDetails.nom}`);
    doc.text(`Client ID: ${clientDetails.cin}`);
    doc.text(`Client Phone: ${clientDetails.telephone}`);
    doc.text(`\nDate: ${newPaiement.date}`);

    doc.end();

    res.status(201).json(newPaiement);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
