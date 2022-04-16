const express = require('express');
const bodyParser = require('body-parser');


// Import any route handlers here.
const employeeRoutes = require('./routes/employee');
const allocationRoutes = require('./routes/allocation');
const spotRoutes = require('./routes/spots');
const sessionRoutes = require('./routes/session');
const accountRoutes = require('./routes/account');

// Import any middleware here
const { createModelsMiddleware, disconnectFromDatababaseMiddleware, logRequest } = require('./middleware/model-middleware');
const { authenticateJWT, authenticateWithClaims } = require('./middleware/auth');


// Start by defining the express app instance
const app = express();
const port = 3000;

// So routes can parse json files for parameters
app.use(bodyParser.json());

// On every request, this gets called first. This is the first step in our "middleware chain".
// We put this before anything else because we know our route handlers are going to need connections
// to the database
app.use(createModelsMiddleware);

// Add a health route. Note the new argument: next
app.get('/health', (request, response, next) => {
    const responseBody = { status: 'up', port };
    response.json(responseBody);
    // next() is how we tell express to continue through the middleware chain
    next();
});

// For any route that starts with `/students`, use the route handler here
app.use('/employee', authenticateJWT, employeeRoutes);
app.use('/allocation', authenticateJWT, allocationRoutes);
app.use('/spots', authenticateJWT, spotRoutes);
app.use('/session', sessionRoutes);
app.use('/account', accountRoutes);

app.use(logRequest);

// The last step of a request middleware chain is to disconnect from the DB.
app.use(disconnectFromDatababaseMiddleware);

// Now that we've configured the app, make it listen for incoming requests
app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});