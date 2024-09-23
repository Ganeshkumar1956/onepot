const express = require('express');
const recipesController = require('../controllers/RecipesController');

const router = express.Router();

// Recipe Routes
router.post('/', recipesController.createRecipe);
router.get('/', recipesController.getAllRecipes);
router.get('/:recipe_id', recipesController.getRecipeById);
router.put('/:recipe_id', recipesController.updateRecipe);
router.delete('/:recipe_id', recipesController.deleteRecipe);

module.exports = router;
