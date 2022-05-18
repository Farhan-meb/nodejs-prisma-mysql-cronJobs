const express = require('express');
const middlewares = require('./middlewares');
const router = require('./routes');
const globalErrorHandler = require('./controllers/handlers/errorController');
const _delete = require('./helpers/deleteFolderFiles');
const cronJobs = require('./cron-jobs')

const app = express();

require('dotenv').config({ silent: true });

app.use(...middlewares);

router.registerApplicationRoutes(app);

app.use(globalErrorHandler);

_delete.deleteImages();

module.exports = app;
