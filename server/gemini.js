const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Configure the model with desired generation parameters
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        candidateCount: 1,         // Number of generated responses to return

        maxOutputTokens: 60,       // Limit the number of tokens in the output
        temperature: 0.5,          // Control randomness; lower for more deterministic responses

    },
});

// Function to generate a short response
async function generateShortResponse(prompt) {
    try {
        // Generate content based on the prompt
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',    // Role of the message sender (e.g., user, assistant)
                    parts: [
                        {
                            text: `You are an expert assistant for students enrolled in the ALX Africa program (https://www.alxafrica.com/). Respond to this query as if you were helping a student from the program: ${prompt}`,
                        }
                    ],
                }
            ],
            generationConfig: {
                maxOutputTokens: 60, // Override maxOutputTokens if needed for this call
                temperature: 0.5,    // Override temperature if needed for this call

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
