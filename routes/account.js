const express = require('express');
const EmployeeController = require('../controllers/employee');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;

        if(!body.entry_num)
            body.entry_num = "";
        if(!body.roles)
            body.roles = "";
        if(!body.last_name)
            body.last_name = "";

        const result = await req.models.employee.createNewEmployee(body.employee_id, body.password, body.entry_num, body.roles, body.last_name);
        if(result.length !== 0) {
            res.status(201).json(result);
        } else {
            res.status(400).json('employee could not be tamed');
        }

    } catch (err) {
        console.error('Failed to make employee:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})

module.exports = router;