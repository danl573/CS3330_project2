const express = require('express');
const ParkingSpaceController = require('../controllers/parking_space');
const router = express.Router();



router.get('/', async (req, res, next) => {
    try {
        const query = req.query;
        
        const result = await ParkingSpaceController.getParkingList(req.models.parking_space, query['stadium'], query['lot'], query['available']);
        if(result.length !== 0) {
            res.status(200).json(result);
        } else {
            res.status(400).json('No parking spots available');
        }



    } catch (err) {
        console.error('Failed to get spots:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});




module.exports = router;