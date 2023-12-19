const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); 

const {
  createPaiement,
  getAllPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement,
} = require('../controllers/paiementController');
const router = express.Router();

router.post('/Paiements', createPaiement,authMiddleware);
router.get('/Paiements', getAllPaiements,authMiddleware);
router.get('/Paiements/:id', getPaiementById,authMiddleware);
router.put('/Paiements/:id', updatePaiement,authMiddleware);
router.delete('/Paiements/:id', deletePaiement,authMiddleware);

module.exports = router;