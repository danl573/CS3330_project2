const express = require('express');
const EmployeeController = require('../controllers/employee');
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        
        const result = await EmployeeController.authenticateUser(req.models.employee, body.employee_id, body.password);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to authenticate employee:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

router.get('/', async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    const result = await EmployeeController.getUser(token);
    res.status(201).json(result);
    next();
})

module.exports = router;