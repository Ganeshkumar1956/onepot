const express = require('express');
const FavoriteController = require('../controllers/FavoriteController');

const router = express.Router();

router.post('/', FavoriteController.addFavorite);
router.get('/', FavoriteController.getFavorite);
router.post('/remove/', FavoriteController.removeFavorite);

module.exports = router;
