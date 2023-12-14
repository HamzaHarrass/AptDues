const express = require('express');
const {
  createPaiement,
  getAllPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement,
} = require('../controllers/paiementController');
const router = express.Router();

router.post('/Paiements', createPaiement);
router.get('/Paiements', getAllPaiements);
router.get('/Paiements/:id', getPaiementById);
router.put('/Paiements/:id', updatePaiement);
router.delete('/Paiements/:id', deletePaiement);

module.exports = router;
