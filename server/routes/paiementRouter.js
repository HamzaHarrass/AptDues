const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const {
  createPaiement,
  getAllPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement,
} = require('../controllers/paiementController');
const router = express.Router();

router.post('/Paiements', createPaiement, isAuthenticated);
router.get('/Paiements', getAllPaiements , isAuthenticated);
router.get('/Paiements/:id', getPaiementById);
router.put('/Paiements/:id', updatePaiement);
router.delete('/Paiements/:id', deletePaiement);

module.exports = router;
