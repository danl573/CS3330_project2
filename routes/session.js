const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        
        const result = await req.models.employee.authenticateEmployee(body.employee_id, body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to authenticate employee:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;