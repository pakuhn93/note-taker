const express = require('express');
// including the routes files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// initializing express application and establishes the port based on local or hosted
const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
// uses the public folder when live for webpage assets
app.use(express.static('public'));

// API Endpoint: /api
app.use('/api', apiRoutes);

// Home Endpoint: /
app.use('/', htmlRoutes);

// start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));