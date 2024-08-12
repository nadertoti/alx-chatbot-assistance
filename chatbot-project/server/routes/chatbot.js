const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../controllers/knowledgeBaseController');

router.post('/ask', knowledgeBaseController.handleQuery);  // Direct call

module.exports = router;
