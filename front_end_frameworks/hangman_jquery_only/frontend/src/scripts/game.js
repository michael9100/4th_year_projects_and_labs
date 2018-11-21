// jQuery
var $ = require('jquery');
window.jquery = $;
require('webpack-jquery-ui');

var words = require('../words.json')
var alphabet = require('../alphabet.json')
var users = require('../users.json')
var previousWins = [] 
var currentGame
var user

// =============================================
// Init Game
// =============================================
$(document).ready(() => { 
    // Authentication
    if(!user) {
        initAuth()
    } 
    else {
        newGame()
    }
    $('.restartBtn').click(() => {
        resetGame()
        $('.modal').hide()
        newGame()
    })
});


// =============================================
// Create a new game
// =============================================
function newGame() {
    $('#app').prepend(`
        <nav id="nav"><button class="btn" id="logout">Logout</button></nav>
    `)

    $('#logout').click(() => {
        user = null;
        resetGame()
        initAuth()
    })

    $('#sidebar').prepend(`
        <h2>Previous Wins <span id="numberOfWins"></span></h2>
        <ol id="winWordList"></ol>
    `)

    $('#game').empty()
    // Previous Wins (Need to make this save and retrieve from JSON)
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

    displayPriviousWins()

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
                $(inputs[i]).effect( "bounce", "slow" );
                letterFound = true
                numCorrectLetters++
            }
        }
        $('#' + btn.target.id).attr("disabled", true)

        // If the letter is NOT in the word then
        // Increment numWrongLetters and change image
        if (letterFound == false) {
            numWrongLetters++
            $('#' + btn.target.id).effect( "shake", "slow" );
            $('#hangImage').attr('src', `${require('../imgs/hangman-' + numWrongLetters + '.png')}`)
        }

        // Then check if the person won or not and display the modals.
        if (numCorrectLetters == currentGame.word.length) {
            $("button.alphabet").attr("disabled", true)
            resetGame()
            $.each($('.wordWas'), (i, msg) => {
                msg.innerText = `The word was: ${currentGame.word}`
            })
            previousWins.push(currentGame.word)
            $('#winner').show()
        }
        if (numWrongLetters == 9) {
            $("button.alphabet").attr("disabled", true)
            $.each($('.wordWas'), (i, msg) => {
                msg.innerText = `The word was: ${currentGame.word}`
            })
            resetGame()
            $('#loser').show()
        }
    })

    // Animations
    $("button.alphabet").hover((btn) => {
        $('#' + btn.target.id).animate({
            borderWidth: "5px"
        }, 100)
    }, (btn) => {
        $('#' + btn.target.id).animate({
            borderWidth: "0px"
        }, 100)
    })

}


// =============================================
// Helper Functions
// =============================================
function resetGame() {
    $('#nav').remove()
    $('#game').empty()
    $('#sidebar').empty()
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

function displayPriviousWins() {
    $('#numberOfWins')[0].innerHTML = previousWins.length
    $('#winWordList').empty()
    for(var i = 0; i < previousWins.length; i++) {
        $('#winWordList').prepend(`<li>${previousWins[i]}</li>`)
    }
}


// Authenticaton 
function initAuth() {
    // Build Markup
    var html = ``
    html += `
        <form>
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="example@example.com" name="email" required>
        
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="mySuperSecretPassword" name="password" required>
        
            <div class="formBtns">
                <button type="button" id="registerBtn">Register</button>
                <button type="button" id="loginBtn">Login</button>
            </div>
            </div>
        </form>
    `
    $('#game').append(html)

    // Register
    $('#registerBtn').click((btn) =>  {
        var email = $('#email').val()
        var password = $('#password').val()
        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() == email.toLowerCase()) {
                alert(`${email} is already in user. Did you mean to login?`)
                return
            }
            else if (email.toLowerCase().trim() === "" || password.toLowerCase().trim() === "") {
                alert(`Email or Password cannot be blank!`)
                return
            }
            else {
                user = {
                    "email": email,
                    "password": password,
                    "gamesWon": []
                }
            }
        }
        users.push(user)
        login(user.email, user.password)
    })

    // login
    $('#loginBtn').click((btn) =>  {
        var email = $('#email').val()
        var password = $('#password').val()    
        login(email, password)
    })

    function login(email, password) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() == email.toLowerCase()) {
                if (users[i].password == password) {
                    user = users[i]
                    console.log("logged in")
                    previousWins = user.gamesWon
                    newGame()
                    break
                }
                else {
                    alert("Wrong Password")
                }
            }
        }
    }
}