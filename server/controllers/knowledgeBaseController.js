const KnowledgeBase = require('../models/KnowledgeBase');
const model = require('../gemini'); // Import the Gemini model
const { generateShortResponse } = require('../gemini'); // Import the updated generateShortResponse function

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
        const answer = await KnowledgeBase.findOne({
            question: { $regex: message, $options: 'i' } // Case-insensitive search
        });

        if (answer) {
            // If a matching answer is found in the knowledge base, return it
            res.status(200).json({ response: answer.response });
        } else {
            // If no answer is found, generate a response using the Gemini API
            try {
                const generatedText = await generateShortResponse(message);

                if (generatedText) {
                    // If the response was successfully generated, return it
                    res.status(200).json({ response: generatedText });
                } else {
                    // If the Gemini API response is null, return an error message
                    res.status(500).json({ error: 'Failed to generate a response. Please try again later.' });
                }
            } catch (apiError) {
                // Handle any errors that occur while generating the response
                console.error('Error generating response from Gemini API:', apiError);
                res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
            }
        }
    } catch (err) {
        // Handle any other errors that occur
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
