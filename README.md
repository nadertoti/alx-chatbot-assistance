________________________________________
Alx Assistance Chatbot
This project is a chatbot designed to assist software engineering students enrolled in the ALX Africa program. The chatbot provides answers to common questions students may have.
Project Overview
This chatbot aims to enhance the student experience by providing quick and accurate responses to frequently asked questions. It utilizes a combination of a knowledge base and the Gemini API for generating answers when the knowledge base does not contain the necessary information.
ALX Africa Program
The chatbot is specifically tailored to support students in the ALX Africa Software Engineering Program, a leading initiative focused on nurturing and developing tech talent across the continent.
Features
Chatbot Interface: Simple and user-friendly interface for students to ask questions.
Knowledge Base: Stores frequently asked questions and their corresponding answers.
Dynamic Responses: Generates responses using the Gemini API for questions not covered in the knowledge base.
Future Enhancements: Admin panel to manage the knowledge base.
Technologies Used
Frontend: HTML, TailwindCSS, JavaScript
Backend: Node.js, Express.js, MongoDB, Mongoose
API Integration: Gemini API (Google Generative AI)

Project Architecture
 ![image](https://github.com/user-attachments/assets/eb858e8f-c656-47fa-af84-d332179b66ad)

1. Public/
index.html: This is the front-end of the application. It contains the HTML structure for the chatbot interface, utilizing TailwindCSS for styling. Users interact with the chatbot through this interface.
main.js: The JavaScript file responsible for handling user input and interaction with the chatbot. It sends the user's messages to the back-end and displays the chatbot's responses.
2. Server/
This folder contains all the back-end logic and server configuration for the application.
Controllers/:
KnowledgeBaseController.js: This controller handles user queries by first checking the knowledge base for predefined answers. If no match is found, it sends the query to the Gemini API for a response.
Models/:
KnowledgeBase.js: This Mongoose model defines the schema for the knowledge base, where question-and-answer pairs are stored in MongoDB.
Routes/:
chatbot.js: This route handles incoming chatbot queries, linking to the handleQuery function in the KnowledgeBaseController.js.
knowledgeBase.js: This route manages user queries to the knowledge base, also linking to the handleQuery function in the KnowledgeBaseController.js.
gemini.js: 
This file integrates the Google Gemini API. It uses the API key from the .env file and provides a model that can be used to generate content when a suitable answer is not found in the knowledge base.
index.js: The main server file that configures and starts the Express server. It sets up middleware, connects to the MongoDB database, and includes routing for the chatbot and knowledge base APIs.
3. .env
This file stores environment variables, such as the API key for the Gemini API and the MongoDB connection string.
4. README.md
This file contains setup instructions, usage guidelines, and an overview of the project architecture.
