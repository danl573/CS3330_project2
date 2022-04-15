const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // Route handlers are often this straightforward. Take in a request, call a couple functions,
    // and then provide the response
    const allEmployees = await req.models.employee.fetchAllEmployees();
    console.log('Getting all employees');
    res.json(allEmployees);
    next();
});

router.get('/id', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await req.models.employee.fetchEmployeesByID( body.employee_id );
        console.log('Getting employees by ID');
        if(result.length !== 0) {
            res.status(201).json(result);
        } else {
            res.status(400).json('incorrect id');
        }
        
    } catch (err) {
        console.error('Failed to find Employee:', err);
        res.status(500).json({ message: err.toString() });
    }
});

//:employee_id/:password/:entry_num/:role/:last_name
router.post('/', async (req,res,next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await req.models.employee.createNewEmployee(body.employee_id, body.password, body.entry_num, body.role, body.last_name);
        if(result.length !== 0) {
            res.status(201).json(result);
        } else {
            res.status(400).json('employee could not be tamed');
        }
    } catch(err) {
        console.error('Failed to make employee:', err);
        res.status(500).json({ message: err.toString() });
    }
});

module.exports = router;