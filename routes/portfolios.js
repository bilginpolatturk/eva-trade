const express = require('express');
const router = express.Router()
const Portfolio = require('../models/Portfolio.js')


// Get all portfolios
router.get('/all', (req, res) => {
    Portfolio.findAll()
        .then((portfolios) => res.json({ success: true, data: portfolios }))
        .catch((error) => res.json({ success: false, error: 'Error while fetching portfolios: ' + error }))
})

// Add portfolio
router.post(
    '/', async( req, res, next) => {
        // Get ClientId
        const { clientId } = req.body;

        if (!clientId){
            return res.status(400).json({ success: false, error: 'Please enter a valid client id' });
        }
        const isPortfolioExist = Portfolio.findAll()
        .then((portfolios) => portfolios.clientId === clientId ? true : false);

        if(isPortfolioExist){
            return res.status(400).json({success: false, error: 'This Client has a portfolio already'});
        }else{
        // Create Portfolio
        const portfolio = await Portfolio.create({ clientId });
        return res.status(201).json({ success: true, data: portfolio });
        }
    });

module.exports = router;