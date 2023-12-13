const express = require('express');
const {  updateAppartement , deleteAppartement , getAppartementById , getAllAppartements , createAppartement}  = require('../controllers/appartementControle');
const router = express.Router();

router.post('/appartements', createAppartement);

router.get('/appartements', getAllAppartements);

router.get('/appartements/:id', getAppartementById);

router.put('/appartements/:id', updateAppartement);

router.delete('/appartements/:id', deleteAppartement);


module.exports = router