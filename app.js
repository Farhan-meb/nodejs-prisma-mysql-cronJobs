const express = require('express');
//const db = require('./database');
const middlewares = require('./middlewares');
const router = require('./routes');
const globalErrorHandler = require('./controllers/handlers/errorController');


const app = express();

require('dotenv').config({ silent: true });

app.use(...middlewares);

router.registerApplicationRoutes(app);

//db.connectMongoLocal();

app.use(globalErrorHandler);

module.exports = app;
