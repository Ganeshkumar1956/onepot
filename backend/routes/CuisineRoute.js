const express = require('express');
const cuisinesController = require('../controllers/CuisinesController');

const router = express.Router();

// Cuisine Routes
router.post('/', cuisinesController.createCuisine);
router.get('/', cuisinesController.getAllCuisines);
router.get('/:cuisine_id', cuisinesController.getCuisineById);
router.put('/', cuisinesController.updateCuisine);
router.delete('/:cuisine_id', cuisinesController.deleteCuisine);

module.exports = router;
