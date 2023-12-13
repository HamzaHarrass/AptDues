const Appartement = require('../models/Appartement');

const createAppartement = async (req, res) => {
  try {
    const appartement = new Appartement(req.body);
    await appartement.save();
    res.status(201).json(appartement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAppartements = async (req, res) => {
  try {
    const appartements = await Appartement.find();
    res.json(appartements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppartementById = async (req, res) => {
  try {
    const appartement = await Appartement.findById(req.params.id);
    if (!appartement) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.json(appartement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppartement = async (req, res) => {
  try {
    const appartement = await Appartement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appartement) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.json(appartement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppartement = async (req, res) => {
  try {
    const appartement = await Appartement.findByIdAndDelete(req.params.id);
    if (!appartement) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {  updateAppartement , deleteAppartement , getAppartementById , getAllAppartements , createAppartement};