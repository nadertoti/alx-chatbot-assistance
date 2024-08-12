const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../controllers/knowledgeBaseController');

// Route to handle user queries
router.post('/query', knowledgeBaseController.handleQuery);

module.exports = router;
