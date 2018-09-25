// jQuery
var $ = require('jquery');
window.jQuery = $;

var words = require('../words.json')
var alphabet = require('../alphabet.json')
var currentGame

// =============================================
// Main Game
// =============================================
$(document).ready(function () {
    newGame()
    $('.restartGame').click(function () {
        $('#looser').hide()
        $('#winner').hide()
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
    <img src="src/imgs/hangman-0.png" alt="" id="hangImage">
    <p id="category">Your category is: ${currentGame.category}</p>
    <div id="input-holder">
  `

    for (var i = 0; i < currentGame.word.length; i++) {
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

    $("button.alphabet").click(function (btn) {
        letterFound = false
        var letter = btn.target.innerText.toLowerCase()
        for (var i = 0; i < currentGame.word.length; i++) {
            if (letter === currentGame.word.charAt(i).toLowerCase()) {
                inputs[i].value = letter
                letterFound = true
                numCorrectLetters++
            }
        }
        $('#' + btn.target.id).attr("disabled", true)

        if (letterFound == false) {
            numWrongLetters++
            
            $('#hangImage').attr('src', `src/imgs/hangman-${numWrongLetters}.png`)
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

