const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // Route handlers are often this straightforward. Take in a request, call a couple functions,
    // and then provide the response
    const allEntries = await req.models.entry.fetchAllEntries();
    res.json(allEntries);
    next();
});

module.exports = router;