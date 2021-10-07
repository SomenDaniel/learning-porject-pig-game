'use strict';

const newGame = document.querySelector('.btn--new');
const diceRoll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const cube = document.querySelector('.dice');
cube.classList.add('hidden');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
// const player0Score = document.getElementById('current--0');
// const player1Score = document.getElementById('current--1');

let currentScore = 0;
let activePlayer = 0;
let player0Score = 0;
let player1Score = 0;
let stillPlaying = true;

// switching between players.
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  cube.src = `dice-1.png`;
}

// Finishing the game
function finishTheGame() {
  stillPlaying = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  cube.classList.add('hidden');
}

// roll dice.
diceRoll.addEventListener('click', function () {
  if (stillPlaying) {
    const rolled = Math.trunc(Math.random() * 6) + 1;
    if (rolled > 1) {
      currentScore += rolled;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      cube.src = `dice-${rolled}.png`;
      cube.classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});

// holding the points.
hold.addEventListener('click', function () {
  if (stillPlaying) {
    if (activePlayer === 0) {
      player0Score += currentScore;
      document.getElementById('score--0').textContent = player0Score;
      currentScore = 0;
      document.getElementById(`current--0`).textContent = currentScore;
      if (player0Score >= 50) {
        finishTheGame();
      }
      switchPlayer();
    } else {
      player1Score += currentScore;
      document.getElementById('score--1').textContent = player1Score;
      currentScore = 0;
      document.getElementById(`current--1`).textContent = currentScore;
      if (player1Score >= 50) {
        finishTheGame();
      }
      switchPlayer();
    }
  }
});

// new game.
newGame.addEventListener('click', function () {
  currentScore = 0;
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  cube.classList.add('hidden');
  activePlayer = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player0Score = 0;
  document.getElementById(`score--0`).textContent = player0Score;
  player1Score = 0;
  document.getElementById(`score--1`).textContent = player1Score;
  stillPlaying = true;
});
