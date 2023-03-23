const express = require('express');
const app = express();

const sequelize = require('./config/db');
const Portfolio = require('./models/Portfolio');
const Client = require('./models/Client');
const Share = require('./models/Share');
const Transaction = require('./models/Transaction');

// Connect to db
sequelize
    .authenticate()
    .then(() => console.log('Connected to the database...'))
    .catch((err) => console.log('Error occured: ' + err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Import example datas into MySQL db
const importData = async () => {
    try {
        await Client.bulkCreate(require('./example_data/clients'));
        await Portfolio.bulkCreate(require('./example_data/portfolios'));
        await Share.bulkCreate(require('./example_data/shares'));
        // await Transaction.bulkCreate(require('./example_data/transactions'));
        console.log('Example datas are imported..')
        process.exit()
    } catch (error) {
        console.error(error)
    }
}



    importData();

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, console.log('server running...'));  