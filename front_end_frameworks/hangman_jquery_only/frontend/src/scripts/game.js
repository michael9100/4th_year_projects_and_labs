// jQuery
var $ = require('jquery');
window.jQuery = $;

var words = require('../words.json')
var alphabet = require('../alphabet.json')
var currentGame

// =============================================
// Init Game
// =============================================
$(document).ready(() => {
    newGame()
    $('.restartGame').click(() => {
        $('#looser').hide()
        $('#winner').hide()
        newGame()
    })
});


// =============================================
// Create a new game
// =============================================
function newGame() {
    // Choose a word
    currentGame = generateWord()

    // Build Game Markup
    var html = ``
    html += `
        <img src="src/imgs/hangman-0.png" alt="" id="hangImage">
        <p id="category">Your category is: ${currentGame.category}</p>
        <div id="input-holder">
    `
    for (var i = 0; i < currentGame.word.length; i++) {
        html += `
            <input type="text" class="inline-input" readonly>
        `
    }
    html += `
        </div>
        <div class="button-holder">
    `
    for (var i = 0; i < alphabet.length; i++) {
        html += `
            <button class="btn alphabet" id="${alphabet[i]}">${alphabet[i]}</button>
        `
    }
    html += `
        </div>
    `
    $('#game').append(html)

    // =============================================
    // Attach Event Listers
    // =============================================
    var inputs = $('#input-holder').children()
    var letterFound = false
    var numWrongLetters = 0
    var numCorrectLetters = 0

    // Check if clicked letter is in word
    $("button.alphabet").click((btn) => {
        letterFound = false
        var letter = btn.target.innerText.toLowerCase()
        for (var i = 0; i < currentGame.word.length; i++) {
            if (letter === currentGame.word.charAt(i).toLowerCase()) {
                inputs[i].value = letter
                $(inputs[i]).css({
                    'color': '#329c00',
                    'box-shadow': '0px 0px 8px 0px #329c00',
                    'border': 'solid 2px #fff',
                })
                letterFound = true
                numCorrectLetters++
            }
        }
        $('#' + btn.target.id).attr("disabled", true)

        // If the letter is NOT in the word then
        // Increment numWrongLetters and change image
        if (letterFound == false) {
            numWrongLetters++
            $('#hangImage').attr('src', `${require('../imgs/hangman-' + numWrongLetters + '.png')}`)
        }

        // Then check if the person won or not and display the modals.
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

    // Animations
    $("button.alphabet").hover((btn) => {
        $('#' + btn.target.id).animate({
            borderWidth: "5px"
        }, 'fast')
    }, (btn) => {
        $('#' + btn.target.id).animate({
            borderWidth: "0px"
        }, 'fast')
    })

}


// =============================================
// Helper Functions
// =============================================
function resetGame() {
    $('#game').empty()
}

function randomInt(max) {
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