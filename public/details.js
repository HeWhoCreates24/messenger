const msg = document.querySelector(".msg");
const del = document.querySelector(".delete");
const save = document.querySelector(".save");
const id = msg.id;
const username = document.querySelector(".from").innerText.slice(6);
const loggedIn = (username != "anonymous");

del.addEventListener("click", async () => {
  // alert("del");
  axios
    .delete(`/chats/${id}`)
    .then(() => {
      if(loggedIn){
        document.location.href = `/chats/user/${username}`;
      }else{
        document.location.href = "/chats";
      }
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
      if(loggedIn){
        document.location.href = `/chats/user/${username}`;
      }else{
        document.location.href = "/chats";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
