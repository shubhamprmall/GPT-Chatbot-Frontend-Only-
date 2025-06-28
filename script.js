const chatBox = document.getElementById("chat-box");
const inputField = document.getElementById("user-input");

// Your OpenAI API key
const API_KEY = "YOUR_OPENAI_API_KEY";

async function sendMessage() {
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  inputField.value = "";

  const response = await fetch("https_Link_Api_Chat_replace", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.6-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content.trim();
  appendMessage("GPT", reply);
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
// Add this line at the end or after DOM is loaded
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents form submission if inside a form
    sendMessage();
  }
});

