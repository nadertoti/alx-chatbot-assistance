function sendMessage(event) {
    if (event.key === 'Enter') {
        const inputBox = document.getElementById('user-input');
        const message = inputBox.value.trim();

        if (message) {
            addMessageToChat('user-message', message);
            inputBox.value = '';

            // Send the message to the backend
            fetch('/api/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }) // Ensure message is correctly passed
            })
                .then(response => response.json())
                .then(data => {
                    addMessageToChat('chatbot-message', data.response);
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        }
    }
}

function addMessageToChat(type, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type} ${type === 'user-message' ? 'text-right' : 'text-left'} mt-2`;
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
