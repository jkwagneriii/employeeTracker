//Dependencies 
const express = require('express');
const inquirer = require('inquirer');

//Routes 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Express 
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(PORT, () => console.log(`Listening on PORT: PORT`));