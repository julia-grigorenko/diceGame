'use strict';
// New rule modification:
// Add another dice to the game, so that there are two dices now. The player looses his current score
// when one of them is a 1.

var activePlayer, scores, dice, dices, previousDice, gamePlaying, roundScore, finalScore, isOne;

var diceDom = document.querySelectorAll('.dice');
var scorePlayer1 = document.getElementById('score-0');
var scorePlayer2 = document.getElementById('score-1');

var currentScorePlayer1 = document.getElementById('current-0');
var currentScorePlayer2 = document.getElementById('current-1');

var rollBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var newBtn = document.querySelector('.btn-new');

var finalScoreElem = document.querySelector('.final-score');

var getInputValue = function () {
  finalScore = finalScoreElem.value;
  return finalScore;
};

var init = function () {
  finalScore = 10;
  finalScoreElem.value = finalScore;
  scores = [0,0];
  dices = [];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  isOne = false;
  dice = 0;

  var player1 = document.getElementById('name-0');
  var player2 = document.getElementById('name-1');

  var playerPanel1 = document.querySelector('.player-0-panel');
  var playerPanel2 = document.querySelector('.player-1-panel');

  // diceDom.style.display = 'none';
  for (var i = 0; i < diceDom.length; i++) {
    diceDom[i].style.display = 'none';
  }

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

  // 2.hide the dices
  for (var i = 0; i < diceDom.length; i++) {
    diceDom[i].style.display = 'none';
  }
};


var nextPlayer = function () {
  // 1.Set 0 current scores to previous player
  roundScore = 0;
  dice = 0;
  console.log('b' + roundScore);
  isOne = false;

  // 2.display  previous player`s current scores
  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  // 3.Switch players
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // 4.Switch activePlayer pannel and hide the dice with timeout
  setTimeout(switchPlayerPanel, 700);
};

var checkDicesForOne = function () {
  for (var i = 0; i < diceDom.length; i++) {
    if (dices[i] === 1) {
      isOne = true;
    }
   }
};

var rollDice = function () {
  if (gamePlaying) {
    // 1. Random number
    for (var i = 0; i < diceDom.length; i++) {
      dices[i] = getRandomInt(1,6);
      dice += dices[i];
    }
    checkDicesForOne();

    // 2. Display the result
    for (var i = 0; i < diceDom.length; i++) {
      diceDom[i].style.display = 'block';
    }

    for (var i = 0; i < diceDom.length; i++) {
      diceDom[i].src = 'img/dice-' + dices[i] + '.png';
    }

    // 3. Update the round score if the rolld number was not a 1
    if (!isOne) {
        // Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // 4. Turn to next player
      console.log('a' + roundScore);
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
    if (scores[activePlayer] >= finalScore) {
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
finalScoreElem.addEventListener('input', getInputValue);
