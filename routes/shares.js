const express = require('express');
const router = express.Router();
const Share = require('../models/Share.js');

// Get all shares
router.get('/all', (req, res) => {
    Share.findAll()
        .then((shares) =>
            res.json({
                success: true,
                data: shares,
            }))
        .catch((err) =>
            res.json({
                success: false,
                error: 'Error while fetching shares',
            }))
});

// Add Share
router.post('/', (req, res) => {
    const { symbol, price } = req.body;

    // Create Share
    Share.create({
        symbol,
        price,
    })
        .then((share) => res.status(201).json({ success: true, data: share }))
        .catch((err) => res.status(400).json({ success: false, error: 'Error while adding share' }));
});

// Update Share price with id on hourly basis
router.put('/:id', async (req, res) => {
    const { price } = req.body;

    Share.findByPk(req.params.id)
        .then((share) => {
            share.price = price;
                share
                .save()
                .then((updatedShare) => res.json({ success: true, data: updatedShare }))
                .catch((err) => res.status(400).json({ success: false, error: 'Error while updating share' }))

        })
        .catch((err) => res.status(404).json({ success: false, error: 'Could not found any share with the given id' }));

});


module.exports = router;