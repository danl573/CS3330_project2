const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

router.get('/current', async (req, res, next) => {
    try {
        const employee = req.employee;
        const result = await Employee.findEmployeeById(Employee.id);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current employee:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.employee.createNewEmployee(body.id, body.password, body.entry_num, body,roles, body.last_name);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new employee:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;