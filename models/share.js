const Sequelize = require('sequelize');
const db = require('../config/db');
// define share model in MySQL db
const Share = db.define('share', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true
    },
    price: {
        type: Sequelize.DECIMAL(16, 2),
        allowNull: false,
    },
});

// Create table if it does not exists
Share.sync({});

module.exports = Share;