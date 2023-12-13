const express = require('express');
const {createClient, getAllClients, getClientById, updateClient, deleteClient} = require('../controllers/clientControle');
const router = express.Router();

router.post('/clients', createClient);
router.get('/clients', getAllClients);
router.get('/clients/:id', getClientById);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

module.exports = router;
