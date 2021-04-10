let firstCard = null;
let secondCard = null;
let comparing = false;
let matches = 0;
let clicks = 0;

const gameContainer = document.getElementById('game');
const score = document.querySelector('#score');
const currentClicks = document.querySelector('#clicks');
const body = document.querySelector('body');

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
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

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (comparing) return;
  if (event.target.classList.contains('flipped')) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = event.target.classList[0];
  if (!firstCard || !secondCard) {
    currentCard.classList.add('flipped');
    firstCard = firstCard || currentCard;
    if (currentCard == firstCard) {
      secondCard = null;
    } else {
      secondCard = currentCard;
    }
  }
  if (firstCard && secondCard) {
    comparing = true;
    clicks++;
    if (firstCard.classList[0] == secondCard.classList[0]) {
      matches++;
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null;
      comparing = false;
    } else {
      setTimeout(function () {
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;
        comparing = false;
      }, 1000);
    }
  }
  currentClicks.innerText = `Current Guesses: ${clicks}`;
  if (matches * 2 == COLORS.length) {
    score.innerText = `Matches: ${matches} GAME OVER!`;
    if (matches == clicks) {
      body.style.backgroundColor = 'black';
      body.style.color = 'white';
    }
    return;
  }
  score.innerText = `Matches: ${matches}`;
}

// when the DOM loads
createDivsForColors(shuffledColors);
