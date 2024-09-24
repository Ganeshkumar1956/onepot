const express = require('express');
const TagController = require('../controllers/TagController');

const router = express.Router();

router.post("/create",TagController.createTag);
router.post('/', TagController.addRecipeTag);
router.get('/:tag_name', TagController.getRecipeByTag);

module.exports = router;
