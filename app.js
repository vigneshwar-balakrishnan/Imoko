const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = Number(process.env.PORT || 3000);

// For reading config variables from the env
require('dotenv').config()

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// For testing, sending a formatted response to the browser
app.set('json spaces', 2);

// Import all routes
const postRoutes = require('./routes/postRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Assign the above routes to route paths
app.use('/', uploadRoutes);
app.use('/gallery', postRoutes);

app.listen(port);