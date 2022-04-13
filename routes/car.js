const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // Route handlers are often this straightforward. Take in a request, call a couple functions,
    // and then provide the response
    const allCars = await req.models.car.fetchAllCar();
    res.json(allCars);
    next();
});

module.exports = router;