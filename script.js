'use strict';
const score = document.querySelector('.score');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEL = document.querySelector('.dice');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// let scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
// score0.textContent = 0;
// score1.textContent = 0;
// diceEL.classList.add('hidden');

const initialCondition = function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEL.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

initialCondition();
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   show dice roll
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //   if is it 1
    if (dice !== 1) {
      currentScore += dice;
      //   console.log(currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switching
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //    add current score to total score;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //   switch
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      player0.classList.remove('player--active');
      player1.classList.remove('player--active');
      playing = false;
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialCondition);
