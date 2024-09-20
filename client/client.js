// socket code.
const socket = io.connect('http://localhost:5000');
const userName = prompt("Enter your name");

//emit the username to the server.
socket.emit("join", userName);

const messageInput = document.getElementById("message-input");
const messageList = document.getElementById("message-list");
const sendButton = document.getElementById("send-message");

sendButton.addEventListener("click", function () {
	// read message from input and send to server.
	const message = messageInput.value;
		if (message) {
		socket.emit("new_message", message);

		// add message to the list.
		const messageElement = document.createElement("div");
		messageElement.innerText = userName + ": " + message;
		messageList.appendChild(messageElement);

		// after message is sent empty the message input box value.
		messageInput.value = ""

	} else {
		console.log("Message input is empty");
		return;
	}
});

// Listen for broadcast message, and add it to the list.
socket.on('broadcast_message', (userMessage) => {
	const messageElement = document.createElement("div");
	messageElement.innerText = userMessage.username + ": " + userMessage.message;
	messageList.appendChild(messageElement);
})