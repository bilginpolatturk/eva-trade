const express = require('express');
const app = express();

const sequelize = require('./config/db');

sequelize
    .authenticate()
    .then(() => console.log('Connected to the database...'))
    .catch((err) => console.log('Error occured: ' + err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/clients', require('./routes/clients'));
app.use('/api/portfolios', require('./routes/portfolios'));
app.use('/api/shares', require('./routes/shares'));
app.use('/api/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log('server running...'));  