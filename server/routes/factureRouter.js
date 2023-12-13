const express = require('express');
const {
  createFacture,
  getAllFactures,
  getFactureById,
  updateFacture,
  deleteFacture,
} = require('../controllers/factureController');
const router = express.Router();

router.post('/factures', createFacture);
router.get('/factures', getAllFactures);
router.get('/factures/:id', getFactureById);
router.put('/factures/:id', updateFacture);
router.delete('/factures/:id', deleteFacture);

module.exports = router;
