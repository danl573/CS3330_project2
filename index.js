const express = require('express');
const bodyParser = require('body-parser');

// Import any route handlers here.
const carRoutes = require('./routes/car');
const employeeRoutes = require('./routes/employee');
const entryRoutes = require('./routes/entry');
const eventRoutes = require('./routes/event');
const parkingAllocationRoutes = require('./routes/parking_allocation');
const parkingLotRoutes = require('./routes/parking_lot');
const parkingSpaceRoutes = require('./routes/parking_space');
const stadiumRoutes = require('./routes/stadium');

// Import any middleware here
// const { createModelsMiddleware, disconnectFromDatababaseMiddleware } = require('./middleware/model-middleware');
const { authenticateJWT, authenitcateWithClaims } = require('.middleware/auth');

// Start by defining the express app instance
const app = express();
const port = 3000;

// On every request, this gets called first. This is the first step in our "middleware chain".
// We put this before anything else because we know our route handlers are going to need connections
// to the database
// app.use(createModelsMiddleware);
app.use(bodyParser.json);

// Add a health route. Note the new argument: next
// app.get('/health', (request, response, next) => {
//     const responseBody = { status: 'up', port };
//     response.json(responseBody);
//     // next() is how we tell express to continue through the middleware chain
//     next();
// });

app.use('./session', sessionRoutes);

// For any route that starts with `/students`, use the route handler here
app.use('/car', authenticateJWT, carRoutes);
app.use('/employee', authenticateJWT, employeeRoutes);
app.use('/entry', authenticateJWT, entryRoutes);
app.use('/event', authenticateJWT, eventRoutes);
app.use('/parking_allocation', authenticateJWT, parkingAllocationRoutes);
app.use('/parking_lot', authenticateJWT, parkingLotRoutes);
app.use('/parking_space', authenticateJWT, parkingSpaceRoutes);
app.use('/stadium', authenticateJWT, stadiumRoutes);

// The last step of a request middleware chain is to disconnect from the DB.
// app.use(disconnectFromDatababaseMiddleware);

// Now that we've configured the app, make it listen for incoming requests
app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});