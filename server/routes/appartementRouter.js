const express = require('express');
const { AppartementsAvailable , updateAppartement,deleteAppartement , getAppartementById , getAllAppartements , createAppartement}  = require('../controllers/appartementControle');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/appartements', createAppartement,authMiddleware);

router.get('/appartements', getAllAppartements,authMiddleware);

router.get('/appartement_available', AppartementsAvailable,authMiddleware);

router.get('/appartements/:id', getAppartementById,authMiddleware);

router.put('/appartements/:id', updateAppartement,authMiddleware);

router.delete('/appartements/:id', deleteAppartement,authMiddleware);


module.exports = router