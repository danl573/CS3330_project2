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
const sessionRoutes = require('./routes/session');

// Import any middleware here
const { createModelsMiddleware, disconnectFromDatababaseMiddleware } = require('./middleware/model-middleware');


// Start by defining the express app instance
const app = express();
const port = 3000;

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
app.use('/car', carRoutes);
app.use('/employee', employeeRoutes);
app.use('/entry', entryRoutes);
app.use('/event', eventRoutes);
app.use('/parking_allocation', parkingAllocationRoutes);
app.use('/parking_lot', parkingLotRoutes);
app.use('/parking_space', parkingSpaceRoutes);
app.use('/stadium', stadiumRoutes);
app.use('/session', sessionRoutes);

// The last step of a request middleware chain is to disconnect from the DB.
app.use(disconnectFromDatababaseMiddleware);

// Now that we've configured the app, make it listen for incoming requests
app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});