const Sequelize = require('sequelize');
const db = require('../config/db');
const Portfolio = require('./Portfolio');
const Share = require('./Share');

// define transaction model in MySQL db
const Transaction = db.define('transaction', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: Sequelize.DECIMAL(16, 2),
        allowNull: false,
    },
    isBuy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});
// There is one-to-one relationship so added belongsTo method to define FK
Transaction.belongsTo(Portfolio, {
    foreignKey: {
        allowNull: false,
    },
});
// There is one-to-one relationship so added belongsTo method to define FK
Transaction.belongsTo(Share, {
    foreignKey: {
        allowNull: false,
    },
});

// Create table if it does not exists
Transaction.sync({});

module.exports = Transaction;