const KnowledgeBase = require('../models/KnowledgeBase');
const model = require('../gemini'); // Import the Gemini model

// Controller to handle knowledge base queries through user question
// Firist approach : without handle question uing Gemini API
/* 
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
*/

// Second approach : with handel question using Gemini API
exports.handleQuery = async (req, res) => {
    try {
        const { message } = req.body;

        // Search the knowledge base for an answer
        const answer = await KnowledgeBase.findOne({ question: { $regex: message, $options: 'i' } });

        if (answer) {
            res.status(200).json({ response: answer.response });
        } else {
            // If no answer in knowledge base, generate response using Gemini API
            try {
                const result = await model.generateContent(message);
                const response = await result.response;
                const generatedText = await response.text();

                res.status(200).json({ response: generatedText });
            } catch (apiError) {
                console.error('Error generating response from Gemini API:', apiError);
                res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
            }
        }
    } catch (err) {
        console.error('Error handling query:', err);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

// Controller to handle KnowledgeBase Management using Admin panal
// Get all knowledge base entries
// KnowledgeBase Management Controllers
/*
exports.getAllEntries = async (req, res) => {
    try {
        const entries = await KnowledgeBase.find();
        res.json(entries);
    } catch (err) {
        console.error('Error fetching knowledge base entries:', err);
        res.status(500).json({ error: 'An error occurred while fetching entries.' });
    }
};

exports.getEntryById = async (req, res) => {
    try {
        const entry = await KnowledgeBase.findById(req.params.id);
        if (entry) {
            res.json(entry);
        } else {
            res.status(404).json({ error: 'Entry not found.' });
        }
    } catch (err) {
        console.error('Error fetching knowledge base entry:', err);
        res.status(500).json({ error: 'An error occurred while fetching the entry.' });
    }
};

exports.createEntry = async (req, res) => {
    try {
        const { question, response } = req.body;
        const newEntry = new KnowledgeBase({ question, response });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        console.error('Error creating knowledge base entry:', err);
        res.status(500).json({ error: 'An error occurred while creating the entry.' });
    }
};

exports.updateEntry = async (req, res) => {
    try {
        const { question, response } = req.body;
        const updatedEntry = await KnowledgeBase.findByIdAndUpdate(req.params.id, { question, response }, { new: true });
        if (updatedEntry) {
            res.json(updatedEntry);
        } else {
            res.status(404).json({ error: 'Entry not found.' });
        }
    } catch (err) {
        console.error('Error updating knowledge base entry:', err);
        res.status(500).json({ error: 'An error occurred while updating the entry.' });
    }
};

exports.deleteEntry = async (req, res) => {
    try {
        const deletedEntry = await KnowledgeBase.findByIdAndDelete(req.params.id);
        if (deletedEntry) {
            res.json({ message: 'Entry deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Entry not found.' });
        }
    } catch (err) {
        console.error('Error deleting knowledge base entry:', err);
        res.status(500).json({ error: 'An error occurred while deleting the entry.' });
    }
};
*/
