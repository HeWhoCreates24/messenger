const msg = document.querySelector(".msg");
const del = document.querySelector(".delete");
const save = document.querySelector(".save");
const id = msg.id;

del.addEventListener("click", async () => {
  // alert("del");
  axios
    .delete(`/chats/${id}`)
    .then(() => {
      document.location.href = "/chats";
    })
    .catch((err) => {
      console.log(err);
    });
});

save.addEventListener("click", async () => {
  // alert("save");
  let updatedMsg = msg.value;
  axios
    .patch(`/chats/${id}`, { msg: updatedMsg })
    .then(() => {
      document.location.href = "/chats";
    })
    .catch((err) => {
      console.log(err);
    });
});
