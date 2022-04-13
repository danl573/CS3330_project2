const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // Route handlers are often this straightforward. Take in a request, call a couple functions,
    // and then provide the response
    const allParkingLots = await req.models.parking_lot.fetchAllParkingLots();
    res.json(allParkingLots);
    next();
});

module.exports = router;