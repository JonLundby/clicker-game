"use strict";

//Man starter med 3 point. Hvis man rammer 0 så er det game over, hvis man rammer 7 så er det level complete.
let points = 0;

window.addEventListener("load", await_play);

function await_play() {
  console.log("awaiting player start..");
  document.querySelector("#btn_start_game").addEventListener("click", start);
  document.querySelector("#plank1_container").classList.add("hidden");
  document.querySelector("#plank2_container").classList.add("hidden");
}

function start() {
  console.log("start function called...");

  // TO DO: start background audio
  document.querySelector("#background_audio").play();

  hideStartMenu();
  startTimer();
  startAnimations();
  startPositions();
  registerClick();

  document.querySelector("#plank1_container").addEventListener("animationiteration", plankRestart);
  document.querySelector("#plank2_container").addEventListener("animationiteration", plankRestart);
  document.querySelector("#bug3_container").addEventListener("animationiteration", bugRestart);
  document.querySelector("#bug1_container").addEventListener("animationiteration", bugRestart);
  document.querySelector("#bug2_container").addEventListener("animationiteration", bugRestart);
}

function hideStartMenu() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#plank1_container").classList.remove("hidden");
  document.querySelector("#plank2_container").classList.remove("hidden");
}

function startTimer() {
  document.querySelector("#timer").classList.add("ui_timer");
}

function startAnimations() {
  document.querySelector("#plank1_container").classList.add("trash_items_movement");
  document.querySelector("#plank2_container").classList.add("trash_items_movement");
  document.querySelector("#bug1_container").classList.add("trash_items_movement");
  document.querySelector("#bug2_container").classList.add("trash_items_movement");
  document.querySelector("#bug3_container").classList.add("trash_items_movement");
}

function startPositions() {
  document.querySelector("#plank1_container").classList.add("position2");
  document.querySelector("#plank2_container").classList.add("position4");
  document.querySelector("#bug1_container").classList.add("position1");
  document.querySelector("#bug2_container").classList.add("position3");
  document.querySelector("#bug3_container").classList.add("position5");
}

function registerClick() {
  document.querySelector("#plank1_container").addEventListener("click", plankClicked);
  document.querySelector("#plank2_container").addEventListener("click", plankClicked);
  document.querySelector("#bug1_container").addEventListener("click", bugClicked);
  document.querySelector("#bug2_container").addEventListener("click", bugClicked);
  document.querySelector("#bug3_container").addEventListener("click", bugClicked);
}

function plankClicked() {
  //log checking if plank was clicked
  console.log("plank clicked...");

  //cleaner code
  let plank = this;

  //making the plank unclickable
  plank.removeEventListener("click", plankClicked);

  //adding pause and fadeout animation
  plank.classList.add("pause");
  plank.querySelector("img").classList.add("item_fadeout");

  //ending animation
  plank.addEventListener("animationend", plankRemove);

  //set audio play time to 0
  document.querySelector("#plank_Click_audio").currentTime = 0;

  //play audio
  document.querySelector("#plank_Click_audio").play();

  //Adding a point and checking if game has been won
  levelComplete();
  addPoint();
}

// Add point funtion
function addPoint() {
  if (points > 0) {
      document.querySelector("#point" + points + "_container").classList.remove("point_drain");  
  }
  points++;
  document.querySelector("#point" + points + "_container").classList.add("point_fill");
  console.log("points = " + points);
}

function plankRemove() {
  //log message new plank instatiated
  console.log("new plank is being instantiated...");

  //cleaner code
  let plank = this; //document.querySelector("#plank1_container")

  //removing the animationend
  plank.removeEventListener("animationend", plankRemove);

  //removing bugClicked css class animations pause and fadeout
  plank.classList.remove("pause");
  plank.querySelector("img").classList.remove("item_fadeout");

  //restarting start animation classes
  plankRestart.call(this);

  //reassigning eventlistener on "click"
  plank.addEventListener("click", plankClicked);
}

function plankRestart() {
  let plank = this;
  //console.log("plankRestart called");
  plank.classList.remove("trash_items_movement");
  plank.offsetWidth;
  plank.classList.add("trash_items_movement");

  plank.classList.remove("position1", "position2", "position3", "position4", "position5");

  let pos = Math.floor(Math.random() * 5) + 1;
  plank.classList.add("position" + pos);
  console.log("plank repositioned at position" + pos);
}

function bugClicked() {
  //log checking if bug was clicked
  console.log("bug clicked...");

  //cleaner code
  let bug = this; //document.querySelector("#bug1_container")

  //making the bug unclickable
  bug.removeEventListener("click", bugClicked);

  //adding pause and fadeout animation
  bug.classList.add("pause");
  bug.querySelector("img").classList.add("item_fadeout");

  //ending animation
  bug.addEventListener("animationend", bugRemove);

  //set audio play time to 0
  document.querySelector("#bug_Click_audio").currentTime = 0;

  //play audio
  document.querySelector("#bug_Click_audio").play();

  //adding a point and checking if game is lost
  gameOver();
  removePoint();
}

//Remove point function
function removePoint() {
  document.querySelector("#point" + points + "_container").classList.remove("point_fill");
  document.querySelector("#point" + points + "_container").classList.add("point_drain");
  points--;
  console.log("points = " + points);
}

function bugRemove() {
  //log message new bug instatiated
  console.log("new bug is being instantiated...");

  //cleaner code
  let bug = this; //document.querySelector("#bug1_container")

  //removing the animationend
  bug.removeEventListener("animationend", bugRemove);

  //removing bugClicked css class animations pause and fadeout
  bug.classList.remove("pause");
  bug.querySelector("img").classList.remove("item_fadeout");

  //restarting start animation classes
  bugRestart.call(this);

  //reassigning eventlistener on "click"
  bug.addEventListener("click", bugClicked);
}

function bugRestart() {
  let bug = this;
  //console.log("bugRestart was called");
  bug.classList.remove("trash_items_movement");
  bug.offsetWidth;
  bug.classList.add("trash_items_movement");

  bug.classList.remove("position1", "position2", "position3", "position4", "position5");

  let pos = Math.floor(Math.random() * 5) + 1;
  bug.classList.add("position" + pos);
  console.log("bug repositioned at position" + pos);
}

function levelComplete() {
  if (points >= 7) {
    console.log("Level complete should be visible...");
    stopGame();
    document.querySelector("#level_complete").classList.remove("hidden");
    document.querySelector("#heaven_container").classList.remove("hidden");
    document.querySelector("#heaven_container").classList.add("fade_in", "blur_pulse");
    //document.querySelector("#win_audio").play();
    document.querySelector("#btn_play_again2").addEventListener("click", restartGame);
  }
}

function gameOver() {
  if (points < 0) {
    console.log("game over should be visible...");
    stopGame();
    document.querySelector("#game_over").classList.remove("hidden");
    //document.querySelector("#loose_audio").play();
    document.querySelector("#btn_play_again1").addEventListener("click", restartGame);
  }
}

function restartGame() {
  console.log("restarting...");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#heaven_container").classList.add("hidden");
  document.querySelector("#heaven_container").classList.remove("fade_in", "blur_pulse");
  points = 0;
  start();
}

function stopGame() {
  document.querySelector("#plank1_container").classList.remove("trash_items_movement");
  document.querySelector("#plank2_container").classList.remove("trash_items_movement");
  document.querySelector("#bug1_container").classList.remove("trash_items_movement");
  document.querySelector("#bug2_container").classList.remove("trash_items_movement");
  document.querySelector("#bug3_container").classList.remove("trash_items_movement");

  document.querySelector("#plank1_container").removeEventListener("click", plankClicked);
  document.querySelector("#plank2_container").removeEventListener("click", plankClicked);
  document.querySelector("#bug1_container").removeEventListener("click", bugClicked);
  document.querySelector("#bug2_container").removeEventListener("click", bugClicked);
  document.querySelector("#bug3_container").removeEventListener("click", bugClicked);

  //reset timer
  document.querySelector("#timer").classList.remove("ui_timer");

  document.querySelector("#background_audio").pause();
  document.querySelector("#background_audio").currentTime = 0;
}
