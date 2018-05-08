'use strict';

var scores, roundScore, activePlayer, dice, player1Score, dicePictures;

scores = [0, 0];
roundScore = 0;
activePlayer = 1;
var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

dice = getRandomInt(1,6);

player1Score = document.querySelector('#current-' + activePlayer);
player1Score.textContent = dice;

var x = document.querySelector('#name-0').textContent;
console.log(x);

dicePictures = document.querySelectorAll('.dice');
for (var i = 0; i < dicePictures.length; i++) {
  dicePictures[i].style.display = 'none';
}
