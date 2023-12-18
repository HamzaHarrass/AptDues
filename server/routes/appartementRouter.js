const express = require('express');
const { AppartementsAvailable , updateAppartement,deleteAppartement , getAppartementById , getAllAppartements , createAppartement}  = require('../controllers/appartementControle');
const router = express.Router();

router.post('/appartements', createAppartement);

router.get('/appartements', getAllAppartements);

router.get('/appartement_available', AppartementsAvailable);

router.get('/appartements/:id', getAppartementById);

router.put('/appartements/:id', updateAppartement);

router.delete('/appartements/:id', deleteAppartement);


module.exports = router