const Facture = require('../models/Facture');

// Create a new facture
const createFacture = async (req, res) => {
  try {
    const facture = new Facture(req.body);
    await facture.save();
    res.status(201).json(facture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all factures
const getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.find().populate('appartement client');
    res.json(factures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific facture by ID
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

// Update a specific facture by ID
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

// Delete a specific facture by ID
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
