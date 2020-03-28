const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate');

const app = express();
app.use(cors());
app.use(express.json()); //sempre que se usa JSON deve se ter essa linha de código 
app.use(routes);
app.use(errors());

module.exports = app;