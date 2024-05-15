const socket = io(); //establish a connection

let username = "";

document.querySelector("#join-btn").addEventListener("click", (event) => {
  event.preventDefault();

  let input = document.querySelector("#username-input");
  username = input.value;
  if (!username) {
    alert("Please enter a usename");
  } else {
    //enter my chat
    let form = document.querySelector(".form-username");
    form.style.display = "none";
    let chatContainer = document.querySelector(".chatroom-container");
    chatContainer.style.display = "block";

    document.querySelector(
      ".chatroom-header"
    ).textContent = `Chatroom - ${username}`;

    // username = "";

    socket.emit("joined", username);
    input.value = "";
  }
});

document.getElementById("send-btn").addEventListener("click", () => {
  let message = document.getElementById("message-input").value.trim();
  // message = "";
  socket.emit("messageSent", { message, username });
  message.value = "";
});

document.querySelector("#exit-btn").addEventListener("click", () => {
  socket.emit("exit", username);

  let form = document.querySelector(".form-username");
  form.style.display = "block";
  let chatContainer = document.querySelector(".chatroom-container");
  chatContainer.style.display = "none";
});

socket.on("messageSent", (data) => {
  console.log(data);
  if (data.username === username) {
    //message is mine
    showMessage(data, true);
  } else {
    //message is someone else
    showMessage(data, false);
  }
});

function showMessage(message, mine) {
  if (mine) {
    document.getElementById("messages-container").innerHTML += `
            <div class='message sent'>${message.username}: ${message.message}</div>
            `;
  } else {
    document.getElementById("messages-container").innerHTML += `
            <div class='message received'>${message.username}: ${message.message}</div>
            `;
  }
}

socket.on("joined", (newUser) => {
  if (newUser !== username) {
    document.getElementById("messages-container").innerHTML += `
            <p class='chip'>${newUser} has joined!</p>
            `;
  }
});

socket.on("exit", (leftUser) => {
  if (leftUser !== username) {
    document.getElementById("messages-container").innerHTML += `
            <p class='chip'>${leftUser} has left!</p>
            `;
  }
});
