"use strict";

window.addEventListener("load", start);

function start() {
  console.log("start function called...");
  document
    .querySelector("#bug_container")
    .addEventListener("click", bugRemove);
}

function bugRemove() {
  console.log("bug clicked...");
  document
    .querySelector("#bug_container")
    .removeEventListener("click", bugRemove);
  document.querySelector("#bug_container").classList.add("pause");
  document.querySelector("#bug_sprite").classList.add("item_fadeout");
}
