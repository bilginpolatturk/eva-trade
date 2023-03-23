const Sequelize = require('sequelize');
const db = require('../config/db');
const Client = require('./Client');

// define portfolio model in MySQL db
const Portfolio = db.define('portfolio', {

});
// There is one-to-one relationship so added belongsTo method to define FK
Portfolio.belongsTo(Client, {
    foreignKey: {
        allowNull: false,
        unique: true,
    },
});

// Create table if it does not exists
Portfolio.sync({});

module.exports = Portfolio;