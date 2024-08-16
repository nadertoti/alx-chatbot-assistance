const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../controllers/knowledgeBaseController');

// Route to handle user queries
router.post('/query', knowledgeBaseController.handleQuery);

// CRUD routes for knowledge base management
/*
router.get('/', knowledgeBaseController.getAllEntries);
router.get('/:id', knowledgeBaseController.getEntryById);
router.post('/', knowledgeBaseController.createEntry);
router.put('/:id', knowledgeBaseController.updateEntry);
router.delete('/:id', knowledgeBaseController.deleteEntry);
*/
module.exports = router;
