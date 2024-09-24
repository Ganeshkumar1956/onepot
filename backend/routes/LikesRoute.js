const express = require('express');
const LikesController = require('../controllers/LikesController');

const router = express.Router();

router.post('/:recipe_id', LikesController.like);
router.get('/:recipe_id', LikesController.countLikes);
router.delete('/:recipe_id', LikesController.unlike);

module.exports = router;
