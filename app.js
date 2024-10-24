// app.js

// Pengaturan login
const correctUsername = "username";
const correctPassword = "password";

function checkLogin() {
    const username = localStorage.getItem("loggedInUser");
    return username === correctUsername;
}

// Fungsi untuk login
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "razel" && password === "razel123") {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "send_message.html";
    } else {
        alert("Invalid username or password!");
    }
});

// Fungsi untuk mengirim pesan
document.getElementById("messageForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!checkLogin()) {
        alert("You must be logged in to send messages.");
        window.location.href = "index.html";
        return;
    }

    const message = document.getElementById("message").value;
    if (message) {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push({ sender: localStorage.getItem("loggedInUser"), content: message });
        localStorage.setItem("messages", JSON.stringify(messages));
        alert("Message sent!");
        document.getElementById("message").value = ""; // Clear the message box
    }
});

// Fungsi untuk melihat pesan
function displayMessages() {
    if (!checkLogin()) {
        alert("You must be logged in to view messages.");
        window.location.href = "index.html";
        return;
    }

    const messagesContainer = document.getElementById("messagesContainer");
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    if (messages.length === 0) {
        messagesContainer.innerHTML = "<p>No messages available.</p>";
    } else {
        messagesContainer.innerHTML = messages
            .map(msg => `<p><strong>${msg.sender}:</strong> ${msg.content}</p>`)
            .join("");
    }
}

// Menampilkan pesan saat halaman view_messages.html dimuat
if (window.location.pathname.endsWith("view_messages.html")) {
    displayMessages();
}
