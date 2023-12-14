const Paiement = require('../models/Paiement');

const createPaiement = async (req, res) => {
  try {
    const newPaiement = new Paiement(req.body);
    // console.log(object);
    await newPaiement.save();
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
    const paiement = await Paiement.findById(req.params.id).populate('appartement client');
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
