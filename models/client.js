const Sequelize = require('sequelize');
const db = require('../config/db');

// define client model in MySQL db
const client = db.define('client', {
    budget: {
        type: Sequelize.DECIMAL(16, 2),
        allowNull: false,

    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        notEmpty: true
    }

});

    // create table if not exist
    client.sync({});

module.exports = client;