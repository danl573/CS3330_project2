const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // Route handlers are often this straightforward. Take in a request, call a couple functions,
    // and then provide the response
    const allParkingSpaces = await req.models.parking_space.fetchAllParkingSpaces();
    res.json(allParkingSpaces);
    next();
});

module.exports = router;