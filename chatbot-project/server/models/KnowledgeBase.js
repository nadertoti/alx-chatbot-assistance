const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema({
    question: { type: String, required: true, unique: true }, // Make question unique for faster lookups
    response: { type: String, required: true }
});

const KnowledgeBase = mongoose.model('KnowledgeBase', knowledgeBaseSchema);

module.exports = KnowledgeBase;
