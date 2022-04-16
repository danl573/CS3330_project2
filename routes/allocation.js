const express = require('express');
const allocation = require('../controllers/allocation');
const allocationController = require('../controllers/allocation');
const router = express.Router();

router.post('/', async(req, res, next) => {
    try {
        const body = req.body;
        const results = await allocationController.createNewAllocation(req.models.car, req.models.parking_allocation, req.models.parking_space,
            body.license, body.car_type, body.space_num, body.vin, body.driver_name, body.credit_card, req.employee.employee_id, body.event, body.event_date);
        
        res.status(201).json(results);

    } catch(err) {
        console.error('Failed to create new Allocation:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})

router.put('/:allocation_id', async(req, res, next) => {
    try {
        const body = req.body; 
        const results = await allocationController.updateAllocation(req.models.car, req.models.parking_allocation,
            req.params.allocation_id, body.license, body.car_type, body.space_num, body.vin, body.driver_name, body.credit_card, req.employee.employee_id, body.event, body.event_date);
        res.status(200).json(results);

    } catch(err) {
        console.error('Failed to update Allocation:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})


router.delete('/:allocation_id', async(req, res, next) => {
    try {
        const results = await allocationController.deleteAllocation(req.models.parking_allocation, req.params.allocation_id);
        res.status(200).json(results);
    } catch(err) {
        console.error('Failed to update Allocation:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})

module.exports = router;