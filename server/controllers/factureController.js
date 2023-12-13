const Facture = require('../models/Facture');

const createFacture = async (req, res) => {
  try {
    const facture = new Facture(req.body);
    await facture.save();
    res.status(201).json(facture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.find().populate('appartement client');
    res.json(factures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id).populate('appartement client');
    if (!facture) {
      return res.status(404).json({ error: 'Facture not found' });
    }
    res.json(facture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFacture = async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('appartement client');
    if (!facture) {
      return res.status(404).json({ error: 'Facture not found' });
    }
    res.json(facture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFacture = async (req, res) => {
  try {
    const facture = await Facture.findByIdAndDelete(req.params.id).populate('appartement client');
    if (!facture) {
      return res.status(404).json({ error: 'Facture not found' });
    }
    res.json({ message: 'Facture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFacture, getAllFactures, getFactureById, updateFacture, deleteFacture };
