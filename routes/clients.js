const express = require('express')
const router = express.Router()
const Client = require('../models/Client.js')



// Get all clients
router.get('/all', (req, res) => {
    Client.findAll()
        .then((clients) => res.json({ success: true, data: clients }))
        .catch((error) => res.json({ success: false, error: 'Error while fetching clients: ' + error }));
})
// Add client
router.post('/', (req, res) => {
    // Get unique client email as Id
    const { email, budget } = req.body

    // Create client with fix budget and email
    Client.create({
        email,
        budget
    })
        .then((client) => res.status(201).json({ success: true, data: client }))
        .catch((error) => res.status(400).json({ success: false, error: 'Error while creating client' + error }));
});

module.exports = router;