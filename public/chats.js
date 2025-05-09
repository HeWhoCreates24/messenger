const container = document.querySelector(".chatContainer");
const userInputs = document.querySelectorAll(".userInput input");

container.addEventListener("click", (evt) => {
  if (
    (evt.target.classList.contains("chat") &&
      evt.target.querySelector(".from").innerText.slice(6) == "anonymous") ||
    (evt.target.classList.contains("from") &&
      evt.target.innerText.slice(6) == "anonymous") ||
    ((evt.target.classList.contains("to") ||
      evt.target.classList.contains("chatInfo")) &&
      evt.target.parentElement.querySelector(".from").innerText.slice(6) ==
        "anonymous")
  ) {
    console.log(evt.target);
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
