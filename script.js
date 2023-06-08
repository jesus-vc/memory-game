const gameContainer = document.getElementById("game");

const previous_result = document.getElementById("previous_count");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "pink",
  "silver",
  "brown",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "pink",
  "silver",
  "brown",
];

//Display score to user when page loads.

function display_score() {
  if (localStorage.topscore == undefined)
    previous_result.innerHTML = "No previous score yet.";
  else {
    previous_result.innerHTML = localStorage.topscore;
  }
}

// Hre is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// This function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let count = 0;
let targets = [];
let guesses_made = 0;
let cards_completed = 0;

const display_guesses_made = document.getElementById("count");

function handleCardClick(event) {
  if (
    count < 2 &&
    event.target.hasAttribute("already_selected") == false &&
    event.target.hasAttribute("temp_tag") == false
  ) {
    count++;
    guesses_made++;
    targets.push(event.target.className);
    event.target.style.backgroundColor = event.target.className;
    event.target.setAttribute("temp_tag", "last2choices");
  }

  display_guesses_made.innerHTML = guesses_made;

  //If NO Match, Remove Style and TempTags + Reset Count/Targets to re-run While-Loop
  if (count == 2 && targets[0] != targets[1]) {
    setTimeout(function () {
      gameContainer.querySelectorAll("[temp_tag=last2choices]").forEach((e) => {
        e.removeAttribute("style");
        e.removeAttribute("temp_tag");
      });
      count = 0;
      targets = [];
    }, 1000);
  } else if (count == 2 && targets[0] == targets[1]) {
    gameContainer.querySelectorAll("[temp_tag=last2choices]").forEach((e) => {
      e.removeAttribute("temp_tag");
      e.setAttribute("already_selected", "true");
      cards_completed++;
    });
    count = 0;
    targets = [];
  }

  //Store the lowest-scoring game in local storage,
  //to display to players a record of the best game played.
  if (cards_completed == COLORS.length) {
    if (
      localStorage.topscore == undefined ||
      guesses_made < localStorage.topscore
    ) {
      localStorage.setItem("topscore", guesses_made);
      window.alert(
        `Congrats!!! You scored a new top score of ${localStorage.topscore}!`
      );
      previous_result.innerHTML = localStorage.topscore;
    }
  }
}

function startGame() {
  document.getElementById("game-wrapper").style.transform = "scale(1)";
  document.getElementById("game-wrapper").scrollIntoView({
    block: "start",
    behavior: "smooth",
    inline: "start",
  });
}

function resetGame() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  shuffledColors = shuffle(COLORS);

  count = 0;
  targets = [];
  guesses_made = 0;
  cards_completed = 0;
  display_guesses_made.innerHTML = guesses_made;

  createDivsForColors(shuffledColors);
}

// When the DOM loads
display_score();
createDivsForColors(shuffledColors);

//Start the game
const start_button = document.getElementById("start_button");
start_button.addEventListener("click", startGame);

// Reset the game
const reset_button = document.getElementById("reset_button");
reset_button.addEventListener("click", resetGame);

// Test Code
// window.addEventListener("load", () => {

//shuffledColors[0];
// });

// if (
//   localStorage.topscore == undefined ||
//   guesses_made < localStorage.topscore
// ) {
//   localStorage.setItem("topscore", guesses_made);
// }
