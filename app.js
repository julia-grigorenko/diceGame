'use strict';

var scores, roundScore, player, activePlayer, player1Score, dicePictures;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;


var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};


var diceDom = document.querySelectorAll('.dice');
for (var i =  0; i < diceDom.length; i ++) {
  diceDom[i].style.display = 'none';
}

var activeScore = document.querySelector('#current-' + activePlayer);
var rollDice = document.querySelector('.btn-roll');

function nextPlayer () {
  var diceDom = document.querySelector('.dice');
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  diceDom.style.display = 'none';
}
function rollBtn () {
  // 1. Random number
  var dice = getRandomInt(1,6);


  // 2. Display the result
  var diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'img/dice-' + dice + '.png';

  // 3. Update the round score if the rolld number was not a 1
  if (dice !== 1) {
    //Add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //Next player
    nextPlayer();
  }
}

rollDice.addEventListener('click', rollBtn);

var holdDice = document.querySelector('.btn-hold');

function holdBtn () {
  // Add CURRENT score to GLOBAL score

  // var diceDom = document.querySelector('.dice');
  // var activeScoreHold = document.querySelector('#score-' + activePlayer);
  // var Score = +activeScoreHold.textContent + roundScore;
  // roundScore = 0;
  // activeScoreHold.textContent = Score;
  // document.querySelector('#current-' + activePlayer).textContent = 0;
  // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  scores[activePlayer] += roundScore;

  // Update the UI
  // document.querySelector('.player-0-panel').classList.toggle('active');
  // document.querySelector('.player-1-panel').classList.toggle('active');
  // diceDom.style.display = 'none';

  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  // Check if player won the game

  var diceDom = document.querySelector('.dice');
  if (scores[activePlayer] >= 20) {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector('.player-' + activePlayer + "-panel").classList.add('winner');
    document.querySelector('.player-' + activePlayer + "-panel").classList.remove('active');  
    // diceDom.style.display = 'none';
  }else {
    nextPlayer();
  }

}

holdDice.addEventListener('click', holdBtn);
