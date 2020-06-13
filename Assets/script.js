var mainSection = document.getElementById("main");
var quizSection = document.getElementById("quiz");
var gameoverSection = document.getElementById("gameover");
var highscoreSection = document.getElementById("highscores");

var pageCounter = 0;

var timerTime = 30;
var timer;

var viewHighscores = document.getElementById("view-highscores");
var highscores = [];
if (localStorage.getItem(("highscores"))) {
    highscores = localStorage.getItem(("highscores"))
    highscores = JSON.parse(highscores);

}

// obj with 5 questions, sets of answers and the correct answer
const questions = {
    question1: "Commonly used data types DO NOT include:",
    answers1: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer1: "alerts",

    question2: "The condition in an if / else statement is enclose within ____.",
    answers2: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer2: "curly brackets",

    question3: "Arrays in JavaScript can be used to store ____.",
    answers3: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer3: "all of the above",

    question4: "String values must be enclosed within ____ when being assigned to variables.",
    answers4: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer4: "quotes",

    question5: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers5: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correctAnswer5: "console.log"

};

// sets the initial properties of the page
function initialise() {
    mainSection.style.display = "block";
    quizSection.style.display = "none";
    gameoverSection.style.display = "none";
    highscoreSection.style.display = "none";

    var startBtn = document.getElementById("start-button");

    viewHighscores.addEventListener("click", highscoreDisplay)

    // starts the quiz from the main page
    startBtn.addEventListener("click", function () {
        mainSection.style.display = "none";
        quizSection.style.display = "block";
        // start timer

        generateQuiz();
        startTimer();
    });
}


// function generates the quiz each time
function generateQuiz() {
    // sets which page to display
    pageCounter++


    // sets the question h1 to the question number string
    var questionDiv = document.getElementById("question");
    var question = "question" + pageCounter;
    questionDiv.textContent = questions[question];

    // sets the answers to the answers array
    var answers = questions["answers" + pageCounter];
    var answerDiv = document.getElementById("answers");

    // removing any answers currently on screen
    answerDiv.innerHTML = "";

    // set the correct answer
    var correctAnswer = questions["correctAnswer" + pageCounter];


    // creates each button to answer the quiz
    for (let i = 0; i < answers.length; i++) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.innerText = answers[i];

        btn.addEventListener("click", function () {
            if (pageCounter < 5) {
                var message = document.getElementById("correct");



                if (event.target.innerText === correctAnswer) {
                    generateQuiz();
                    message.textContent = "Correct!";
                }
                else {
                    generateQuiz();

                    timerTime -= 5;
                    message.textContent = "Wrong!";
                }
            }
            else {
                gameOver();
                console.log(pageCounter);
            }
        });

        li.appendChild(btn);
        // add button to the page
        answerDiv.appendChild(li);

    }
}
function startTimer() {
    // timer
    var timerDiv = document.getElementById("quiz-timer");
    timer = setInterval(function () {

        timerTime--;
        timerDiv.textContent = timerTime;

        if (timerTime <= 0) {
            // clearInterval(timer);
            timerTime = 0;
            timerDiv.textContent = timerTime;
            gameOver(timer);
        }
    }, 1000);
}



function gameOver() {
    if (pageCounter === 5) {
        window.clearInterval(timer);
    }
    quizSection.style.display = "none";
    gameoverSection.style.display = "block";


    var submitBtn = document.getElementById("form");

    timeText = document.getElementById("time");
    timeText.textContent = timerTime;

    submitBtn.addEventListener("submit", submitInitials);



    // highscores
    // localStorage.setItem("user", JSON.stringify(user));
    // var lastUser = JSON.parse(localStorage.getItem("user"));
}

function submitInitials(event) {

    var initialsInput = document.getElementById("initials-input");
    var initials = initialsInput.value;
    event.preventDefault();





    var newHighscore = {
        name: initials,
        score: timerTime
    };
    if (newHighscore.name === "") {
        newHighscore.name = "??";
    }
    highscores.push(newHighscore);

    console.log(newHighscore);
    localStorage.setItem("highscores", JSON.stringify(highscores));


    highscoreDisplay();
}


function highscoreDisplay() {
    var header = document.getElementById("header");
    header.style.display = "none";

    mainSection.style.display = "none";
    highscoreSection.style.display = "block";
    gameoverSection.style.display = "none";

    var backBtn = document.getElementById("go-back");
    backBtn.addEventListener("click", function () {
        location.reload();
    });


    var clearBtn = document.getElementById("clear-highscores");
    clearBtn.addEventListener("click", function () {
        localStorage.clear();
        highscoreList.remove();
    });





    var highscoreList = document.getElementById("highscores-list");
    var sortedPlayers = highscores.sort(function (a, b) {
        return b.score - a.score
    });
    console.log(sortedPlayers);
    for (let i = 0; i < sortedPlayers.length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = sortedPlayers[i].name + " - " + sortedPlayers[i].score;
        highscoreList.appendChild(scoreItem);
    }
}
// calls page to start
initialise();