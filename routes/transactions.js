const express = require('express');
const router = express.Router();
const Client = require('../models/Client.js');
const Portfolio = require('../models/Portfolio.js');
const Share = require('../models/Share.js');
const Transaction = require('../models/Transaction.js');

router.get('/all', (req, res) => {
    Transaction.findAll()
        .then((transactions) => res.json({ success: true, data: transactions }))
        .catch((error) => res.json({ success: false, error: 'Error while fetching transactions: ' + error }));
})

router.post('/buy', async (req, res) => {
    // Get Data
    const { quantity, portfolioId, shareId } = req.body;

    // Check given shareId, PortfolioId and Clients budget 
    const share = await Share.findByPk(shareId);
    if (share === null) return res.status(404).json({ success: false, error: 'Could not found any share with the given id' });

    const portfolio = await Portfolio.findByPk(portfolioId);
    if (portfolio === null) return res.status(404).json({ success: false, error: 'Could not found any portfolio with the given id' });

    let client = await Client.findByPk(portfolio.clientId);

    if (client.budget < share.price * quantity){
        return res.status(400).json({ success: false, error: 'Budget is too low!' });
    }
    // Calculate total share price
    const totalPrice = share.price * quantity;

    // Update clients budget
    client.budget = client.budget - totalPrice;
    client = await client.save();

    // Create buy transaction
    const transaction = await Transaction.create({ portfolioId, shareId, quantity, isBuy: true, totalPrice });

    res.status(201).json({ success: true, data: transaction });
})

router.post('/sell', async (req, res) => {
    // Get Data
    const { quantity, portfolioId, shareId } = req.body;

    // Check given shareId and PortfolioId
    const share = await Share.findByPk(shareId);
    if (share === null) return res.status(404).json({ success: false, error: 'Could not found any not found any share with the given id' });

    const portfolio = await Portfolio.findByPk(portfolioId);
    if (portfolio === null) return res.status(404).json({ success: false, error: 'Could not found any portfolio with the given id' });

    // Group bougth and sold shares
    const totalBoughtShares = await Transaction.sum('quantity', {
        where: { portfolioId, shareId, isBuy: true },
    });

    const totalSoldShares = await Transaction.sum('quantity', {
        where: { portfolioId, shareId, isBuy: false },
    });

    const totalShares = totalBoughtShares - totalSoldShares;

    if (totalShares < quantity) return res.status(404).json({ success: false, error: 'Total shares less than quantity' });

    // Calculate total share price
    const totalPrice = share.price * quantity;

    // Update clients budget
    let client = await Client.findByPk(portfolio.clientId);

    client.balance = client.balance + totalPrice;
    client = await client.save();

    // Create sell transaction
    const transaction = await Transaction.create({ portfolioId, shareId, quantity, isBuy: false, totalPrice });

    res.status(201).json({ success: true, data: transaction });
})

module.exports = router;