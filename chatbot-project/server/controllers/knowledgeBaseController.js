const KnowledgeBase = require('../models/KnowledgeBase');

// Controller to handle knowledge base queries
exports.handleQuery = async (req, res) => {
    try {
        const { message } = req.body; // Make sure 'message' exists in req.body

        const answer = await KnowledgeBase.findOne({ question: { $regex: message, $options: 'i' } });

        if (answer) {
            res.status(200).json({ response: answer.response });
        } else {
            res.status(200).json({ response: 'I am still learning! Please ask me something else.' });
        }
    } catch (err) {
        console.error('Error handling query:', err);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};
