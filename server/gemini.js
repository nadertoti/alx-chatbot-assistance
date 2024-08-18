const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Configure the model with desired generation parameters
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        candidateCount: 1,         // Number of generated responses to return
        maxOutputTokens: 50,       // Limit the number of tokens in the output
        temperature: 0.3,          // Control randomness; lower for more deterministic responses

    },
});

// Function to generate a short response
async function generateShortResponse(prompt) {
    try {
        // Generate content based on the prompt
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',    // Role of the message sender
                    parts: [
                        {
                            text: `You are an expert assistant for students enrolled in the ALX Africa program (https://www.alxafrica.com/). Respond with concise and accurate information similar to a helpdesk FAQ response, use emojies and not use bold text. Question: ${prompt}`,
                        }
                    ],
                }
            ],
            generationConfig: {
                maxOutputTokens: 50,
                temperature: 0.3,

            },
        });

        // Return the generated response text
        return result.response.text();
    } catch (error) {
        console.error('Error generating response:', error);
        return null;
    }
}

// Export the function for use in other parts of the application
module.exports = { generateShortResponse };

// USING GEMINI MODEL ON DEFULT VERSION WITHOUT CONFIGRATION
/*
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = model;
*/
