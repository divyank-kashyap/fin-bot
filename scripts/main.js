// Basic chat functionality
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const userMessage = userInput.value.trim();

    if (userMessage === "") return;

    let botReply = "Sorry, there was an issue.";

    try {
        const response = await axios.post("http://localhost:3000/finance-chat", {
            message: userMessage
        }, {
            headers: { "Content-Type": "application/json" }
        });

        botReply = response.data.reply.parts[0].text;
    } catch (error) {
        console.error("Error:", error);
    }

    // Create user message element
    const userMessageEl = document.createElement('div');
    userMessageEl.classList.add('user-message', 'text-right', 'mb-2');
    userMessageEl.innerHTML = `
        <span class="inline-block bg-blue-500 text-white px-3 py-2 rounded-lg max-w-[80%]">
            ${userMessage}
        </span>
    `;
    chatBox.appendChild(userMessageEl);

    // Create bot response element
    const botMessageEl = document.createElement('div');
    botMessageEl.classList.add('bot-message', 'text-left', 'mb-2');
    botMessageEl.innerHTML = `
        <span class="inline-block bg-gray-300 text-gray-800 px-3 py-2 rounded-lg max-w-[80%]">
            ${botReply}
        </span>
    `;
    chatBox.appendChild(botMessageEl);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    userInput.value = '';
}

// Add event listener for Enter key in input
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


// // Placeholder event listeners for calculators
// document.getElementById('emiCalculator').addEventListener('click', function() {
//     alert('EMI Calculator functionality to be implemented');
// });

// document.getElementById('loanCalculator').addEventListener('click', function() {
//     alert('Loan Calculator functionality to be implemented');
// });

// document.getElementById('stockPrice').addEventListener('click', function() {
//     alert('Stock Price lookup functionality to be implemented');
// });
