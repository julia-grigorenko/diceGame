'use strict';
// New rule modification:
// A player looses his ENTIRE score when he rolls two 6 in a row.
// After that, it`s the next player`s turn.

var activePlayer, scores, dice, previousDice, gamePlaying, roundScore;

var diceDom = document.querySelector('.dice');
var scorePlayer1 = document.getElementById('score-0');
var scorePlayer2 = document.getElementById('score-1');

var currentScorePlayer1 = document.getElementById('current-0');
var currentScorePlayer2 = document.getElementById('current-1');

var rollBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var newBtn = document.querySelector('.btn-new');


var init = function () {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  previousDice = 0;

  var player1 = document.getElementById('name-0');
  var player2 = document.getElementById('name-1');

  var playerPanel1 = document.querySelector('.player-0-panel');
  var playerPanel2 = document.querySelector('.player-1-panel');

  diceDom.style.display = 'none';

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;

  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;

  player1.textContent = 'Player1';
  player2.textContent = 'Player2';

  playerPanel1.classList.remove('winner');
  playerPanel1.classList.remove('active');

  playerPanel2.classList.remove('winner');
  playerPanel2.classList.remove('active');

  playerPanel1.classList.add('active');

};


var getRandomInt = function (min, max) {
  // 1.Get random number between min and max
  return Math.round(Math.random() * (max - min) + min);
};


var switchPlayerPanel = function () {
  // 1. Switch activePlayer pannel
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // 2.hide the dice
  diceDom.style.display = 'none';
};


var nextPlayer = function () {
  // 1.Set 0 current scores to previous player
  roundScore = 0;
  previousDice = 0;

  // 2.display  previous player`s current scores
  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  // 3.Switch players
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // 4.Switch activePlayer pannel and hide the dice with timeout
  setTimeout(switchPlayerPanel, 700);
};


var rollDice = function () {
  if (gamePlaying) {
    // 1. Random number

      dice = getRandomInt(4,6);




      // 2. Display the result
      diceDom.style.display = 'block';
      diceDom.src = 'img/dice-' + dice + '.png';

      // 3. Update the round score if the rolld number was not a 1
      if (dice !== 1) {
        if (previousDice === dice ) {
          console.log(11);
          roundScore = 0;
          scores[activePlayer] = 0;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
          document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
          nextPlayer();

        } else if (dice === 6 && previousDice !== dice) {
          console.log(12);
          previousDice = dice;

          // Add score
          roundScore += dice;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
          console.log(13);
          // Add score
          previousDice = 0;
          roundScore += dice;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
      } else {
        // 4. Turn to next player
        nextPlayer();
      }

  }
};

var holdScores = function () {
  if (gamePlaying) {
    // 1. Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // 2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Check if player won the game
    if (scores[activePlayer] >= 20) {
      console.log(scores[activePlayer]+ '>20');
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.player-' + activePlayer + "-panel").classList.add('winner');
      document.querySelector('.player-' + activePlayer + "-panel").classList.remove('active');
      gamePlaying = false;
    }else {
      nextPlayer();
    }
  }
};

init();
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScores);
newBtn.addEventListener('click', init);
