const express = require('express');
const ingredientsController = require('../controllers/IngredientsController');

const router = express.Router();

// Ingredient Routes
router.post('/', ingredientsController.createIngredient);
router.get('/', ingredientsController.getAllIngredients);
router.get('/:ingredient_id', ingredientsController.getIngredientById);
router.put('/', ingredientsController.updateIngredient);
router.delete('/:ingredient_id', ingredientsController.deleteIngredient);

module.exports = router;
