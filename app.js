window.addEventListener("load", start);

function start() {
  console.log("start function called");
  document
    .querySelector("#bug_container")
    .addEventListener("click", itemRemove);
}

function itemRemove() {
  console.log("an item was clicked and removed");
  document
    .querySelector("bug_container")
    .removeEventListener("click", itemRemove);
  document.querySelector("#bug_container").classList.add("pause");
  document.querySelector("#bug_sprite").classList.add("item_fadeout");
}
