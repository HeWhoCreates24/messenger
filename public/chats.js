const container = document.querySelector(".chatContainer");
const userInputs = document.querySelectorAll(".userInput input");

container.addEventListener("click", (evt) => {
  if (
    !evt.target.classList.contains("chatContainer") &&
    !evt.target.classList.contains("noChats")
  ) {
    let id = evt.target.id;
    document.location.href = `/chats/${id}`;
  }
});

for (let input of userInputs) {
  input.addEventListener("keypress", (evt) => {
    if (evt.key == "Enter") {
      evt.preventDefault();
      if (input.classList.contains("from")) {
        input.nextElementSibling.focus();
      } else {
        input.parentElement.nextElementSibling.focus();
      }
    }
  });
}
