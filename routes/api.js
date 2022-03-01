const express = require('express');
const router = express.Router();
const apiArticleController = require('../controllers/api/article');
router.get('/article', apiArticleController.getArticleBySlug);

module.exports = router;