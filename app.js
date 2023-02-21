"use strict";

window.addEventListener("load", start);

function start() {
  console.log("start function called...");

  document.querySelector("#bug_container").classList.add("trash_items_movement");
  document.querySelector("#plank_container").classList.add("trash_items_movement");

  document.querySelector("#bug_container").addEventListener("click", bugRemove);
  document.querySelector("#plank_container").addEventListener("click", plankRemove);
}

function bugRemove() {
  //log checking if bug was clicked
  console.log("bug clicked...");

  //making the bug unclickable
  document.querySelector("#bug_container").removeEventListener("click", bugRemove);

  //adding pause and fadeout animation
  document.querySelector("#bug_container").classList.add("pause");
  document.querySelector("#bug_sprite").classList.add("item_fadeout");

  //ending animation
  document.querySelector("#bug_container").addEventListener("animationend", bugInstantiate);
}

function bugInstantiate() {
  //log message new bug instatiated
  console.log("new bug is being instantiated...");

  //removing the animationend
  document.querySelector("#bug_container").removeEventListener("animationend", bugInstantiate);

  //removing bugremove css class animations pause and fadeout
  document.querySelector("#bug_container").classList.remove("pause");
  document.querySelector("#bug_sprite").classList.remove("item_fadeout");

  //restarting start animation classes
  document.querySelector("#bug_container").classList.remove("trash_items_movement");
  document.querySelector("#bug_container").offsetWidth;
  document.querySelector("#bug_container").classList.add("trash_items_movement");

  //reassigning eventlistener on "click"
  document.querySelector("#bug_container").addEventListener("click", bugRemove);
}

function plankRemove() {
  //log checking if plank was clicked
  console.log("plank clicked...");

  //making the plank unclickable
  document.querySelector("#plank_container").removeEventListener("click", plankRemove);

  //adding pause and fadeout animation
  document.querySelector("#plank_container").classList.add("pause");
  document.querySelector("#plank_sprite").classList.add("item_fadeout");

  //ending animation
  document.querySelector("#plank_container").addEventListener("animationend", plankInstantiate);
}

function plankInstantiate() {
  //log message new plank instatiated
  console.log("new plank is being instantiated...");

  //removing the animationend
  document.querySelector("#plank_container").removeEventListener("animationend", plankInstantiate);

  //removing bugremove css class animations pause and fadeout
  document.querySelector("#plank_container").classList.remove("pause");
  document.querySelector("#plank_sprite").classList.remove("item_fadeout");

  //restarting start animation classes
  document.querySelector("#plank_container").classList.remove("trash_items_movement");
  document.querySelector("#plank_container").offsetWidth;
  document.querySelector("#plank_container").classList.add("trash_items_movement");

  //reassigning eventlistener on "click"
  document.querySelector("#plank_container").addEventListener("click", plankRemove);
}
