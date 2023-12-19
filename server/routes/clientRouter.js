const express = require('express');
const {createClient, getAllClients, getClientById, updateClient, deleteClient} = require('../controllers/clientControle');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/clients', createClient ,authMiddleware);
router.get('/clients', getAllClients,authMiddleware);
router.get('/clients/:id', getClientById,authMiddleware);
router.put('/clients/:id', updateClient,authMiddleware);
router.delete('/clients/:id', deleteClient,authMiddleware);

module.exports = router;
