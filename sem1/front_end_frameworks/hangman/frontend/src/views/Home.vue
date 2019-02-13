<template>
  <div>
    <b-container>
      <b-row>
          <b-col cols="8">
            <b-card id="game">
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card class="sidebar">
              <h2>Previous Wins</h2>
            </b-card>
          </b-col>
      </b-row>
    </b-container>
    <div class="looser text-center" id="looser">
      <div>
        <h1>YOU LOOSE!</h1>
        <br>
        <button class="btn btn-outline-light restartGame">
          Try Again
        </button>
      </div>
    </div>
    <div class="winner text-center" id="winner">
      <canvas id="confetti-holder"></canvas>
      <div>
        <h1>YOU WIN!</h1>
        <br>
        <button class="btn btn-outline-success restartGame">
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JQuery from 'jquery'
import "confetti-js"
const $ = JQuery
var words = require('../words.json')
var alphabet = require('../alphabet.json')
var currentGame

// =============================================
// Main Game
// =============================================
$( document ).ready(function() {
  var confettiSettings = { "target":"confetti-holder","max":"150","size":"1","animate":true,"props":["circle","square","triangle","line"],"colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],"clock":"25","rotate":true,"width":"","height":"" };
  var confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
  newGame()
  $('.restartGame').click(function() {
    $('#looser').hide()
    $('#winner').hide()
    confetti.clear();
    newGame()
  })

});


// =============================================
// Functions
// =============================================
function newGame() {
  var game = $('#game')

  // Choose a word
  currentGame = generateWord()

  // Build Game
  var html = ``
  html += `
    <img src="../imgs/hangman-0.png" alt="" id="hangImage">
    <p id="category">Your category is: ${currentGame.category}</p>
    <div id="input-holder">
  `

  for (var i = 0; i < currentGame.word.length; i++) {
    // alert(currentGame.word.charAt(i));
    html += `
      <input type="text" class="inline-input">
    `
  }

  html += `
    </div>
    <div class="button-holder">
  `

  for (var i = 0; i < alphabet.length; i++) {
    html += `
      <button class="btn btn-primary m-1 alphabet" id="${alphabet[i]}">${alphabet[i]}</button>
    `
  }

  html += `
    </div>
  `

  $('#game').append(html)

  var inputs = $('#input-holder').children()
  var letterFound = false
  var numWrongLetters = 0
  var numCorrectLetters = 0

  $("button.alphabet").click(function(btn) {
    letterFound = false
    var letter = btn.target.innerText.toLowerCase()
    for (var i = 0; i < currentGame.word.length; i++) {
      if (letter === currentGame.word.charAt(i).toLowerCase() ) {
        inputs[i].value = letter
        letterFound = true
        numCorrectLetters++
      }
    }
    $('#' + btn.target.id).attr("disabled", true)

    if(letterFound == false) {
      numWrongLetters++
      $('#hangImage').attr('src', `../imgs/hangman-${numWrongLetters}.png`)
    }

    if (numCorrectLetters == currentGame.word.length) {
      $("button.alphabet").attr("disabled", true)
      resetGame()
      $('#winner').show()
    }

    if (numWrongLetters == 9) {
      $("button.alphabet").attr("disabled", true)
      resetGame()
      $('#looser').show()
    }
  })
}

function resetGame() {
  $('#game').empty()
}

function randomInt(max) {
  // return random number between 0 and Max
  return Math.floor(Math.random() * Math.floor(max));
}

function generateWord() {
  var category = words[randomInt(3)]
  var word = category.words[randomInt(8)]
  return { 
    "category": category.name,
    "word": word
  }
}

export default {
  name: 'home',
  components: {
  }
}
</script>

<style lang="scss">
.sidebar {
  h2 {
    font-size: 14px;
  }
}

#input-holder {
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	align-content: space-between;

  .inline-input {
    width: 35px;
    height: 35px;
    text-align: center;
  }
}

.button-holder {
  max-width: 430px;
  min-width: 420px;
  margin: 0 auto;
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	align-content: space-between;

  button {
    width: 35px;
    height: 35px;
    padding: 0;
    text-align: center;
  }
}

.looser {
  display: none;
  position: absolute;
  background-color: red;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;

  div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
.winner {
  display: none;
  position: absolute;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>

