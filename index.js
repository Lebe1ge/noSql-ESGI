const express = require('express');
const logger = require('./logger');
const app = express();

require('./utils')(app);
require('./settings')(app);
require('./models')(app);
require('./middlewares')(app);
require('./actions')(app);
require('./routes')(app);

app.use(logger);

console.log(`server listening on port ${app.settings.port}`);
app.listen(app.settings.port);
