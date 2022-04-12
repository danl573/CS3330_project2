const connectToDatabase = require('../models/database-helper');
const Car = require('../models/car');
const Employee = require('../models/employee');
const Entry = require('../models/entry');
const Event = require('../models/event');
const Parking_Allocation = require('../models/parking_allocation');
const Parking_Lot = require('../models/parking_lot');
const Parking_Space = require('../models/parking_space');
const Stadium = require('../models/stadium');



/**
 * This middleware function is meant to be registered BEFORE the route handlers (see index.js)
 * This sets up a connection to the database. We modify the request object by tacking on the
 * models and disconnect function. Any FUTURE middleware / route handler thus has access to
 * those models / disconnect function by virtue of the fact that the request object is the same
 * one through the whole chain
 */
const createModelsMiddleware = async (req, res, next) => {
    console.log('Connecting to the database');
    const { DBQuery, disconnect } = await connectToDatabase();
    req.models = {
        car: new Car(DBQuery, disconnect),
        employee: new Employee(DBQuery, disconnect),
        entry = new Entry(DBQuery, disconnect),
        event = new Event(DBQuery, disconnect),
        parking_allocation = new Parking_Allocation(DBQuery, disconnect),
        parking_lot = new Parking_Lot(DBQuery, disconnect),
        parking_space = new Parking_Space(DBQuery, disconnect),
        stadium = new Stadium(DBQuery, disconnect)

    }
    req.disconnect = disconnect;
    next();
}

/**
 * This middleware function is meant to be registered AFTER the route handlers (see index.js)
 * This closes the connection to the DB.
 */
const disconnectFromDatababaseMiddleware = (req, res, next) => {
    console.log('Disconnecting from the database');
    req.disconnect();
    next();
}

module.exports = {
    createModelsMiddleware,
    disconnectFromDatababaseMiddleware
}