

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false; // מעקב אחרי מצב ההתחלה
var level = 0; // רמת ההתחלה

// זיהוי לחיצת מקש להתחלת המשחק
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    // איפוס רצף הלחיצות של המשתמש
    userClickedPattern = [];

    // עדכון רמת המשחק
    level++;
    $("#level-title").text("Level " + level);

    // בחירת צבע חדש והוספתו לרצף
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // הצגת כל הרצף
    showPattern();
}

function showPattern() {
    var i = 0;
    function displayNextColour() {
        if (i < gamePattern.length) {
            var colour = gamePattern[i];
            $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(colour);
            i++;
            setTimeout(displayNextColour, 600); // הצגת הצבע הבא אחרי 600ms
        }
    }
    displayNextColour(); // התחלת הצגת הרצף
}

// זיהוי לחיצה על כפתור
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // בדיקת תשובת המשתמש
    checkAnswer(userClickedPattern.length - 1);
});

// פונקציה לניגון צליל
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// פונקציה לאנימציית לחיצה
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// פונקציה לבדיקה אם התשובה נכונה
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000); // התחלת השלב הבא אחרי עיכוב
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// פונקציה לאיפוס המשחק
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
