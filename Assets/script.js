// declaring all sections as global
var mainSection = document.getElementById("main");
var quizSection = document.getElementById("quiz");
var gameoverSection = document.getElementById("gameover");
var highscoreSection = document.getElementById("highscores");

// setting the quiz timer text
var timerDiv = document.getElementById("quiz-timer");

// declaring page counter as global
var pageCounter = 0;

// declaring timer related vars as global
var timerTime = 30;
var timer;

// setting highscores to an array
var highscores = [];
// check if there is an item highscores in localStorage
if (localStorage.getItem(("highscores"))) {
    // then assign it to highscores
    highscores = localStorage.getItem(("highscores"))
    // and parse from JSON
    highscores = JSON.parse(highscores);

}

// obj with 5; questions, sets of answers and correct answer
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
    // display only the main section
    mainSection.style.display = "block";
    quizSection.style.display = "none";
    gameoverSection.style.display = "none";
    highscoreSection.style.display = "none";

    // declaring the start btn
    var startBtn = document.getElementById("start-button");
    // starts the quiz from the main page
    startBtn.addEventListener("click", function () {
        // change the current display to the quiz
        mainSection.style.display = "none";
        quizSection.style.display = "block";

        // generate the quiz and start the timer
        generateQuiz();
        startTimer();
    });

    // declaring view highscores text
    var viewHighscores = document.getElementById("view-highscores");
    // addeventlistener for whenever the text is clicked to run highscoreDisplay 
    viewHighscores.addEventListener("click", highscoreDisplay)

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
        // creating the li and button element
        var li = document.createElement("li");
        var btn = document.createElement("button");

        // setting inner text to one of the answers
        btn.innerText = (i + 1) + ". " + answers[i];
        btn.setAttribute("option", answers[i])

        // when btn is clicked check if the page count is less than 5,
        btn.addEventListener("click", function () {
            if (pageCounter < 5) {
                // setting the display message
                var message = document.getElementById("correct");

                // then check if the btn clicked was the right answer
                if (event.target.getAttribute("option") === correctAnswer) {
                    // if so, then display correct
                    message.textContent = "Correct!";
                }
                else {
                    // otherwise, display wrong and take 5 from the time
                    message.textContent = "Wrong!";
                    timerTime -= 5;
                }
                // generate the new question
                generateQuiz();
            }
            // if the page counter is more than 5, there are no more questions, and it must end
            else {
                gameOver();
            }
        });

        // add the btn to the list item
        li.appendChild(btn);
        // add list item to the page
        answerDiv.appendChild(li);

    }
}

// starts the timer that will be used to score the user
function startTimer() {

    // sets timer to a timer
    timer = setInterval(function () {
        // each second, the timerTime will reduce by 1
        timerTime--;
        // and then display it to the screen
        timerDiv.textContent = timerTime;

        // once timer is equal or less than 0
        if (timerTime <= 0) {
            // set the timer to 0
            timerTime = 0;

            // run gameover
            gameOver();
        }

        // setting the time of the timer to 1000 milliseconds
    }, 1000);
}

// gameover function to change display and get initials
function gameOver() {
    // stop the timer
    window.clearInterval(timer);
    // update the timer one last time
    timerDiv.textContent = timerTime;

    // display only the gameover section
    mainSection.style.display = "none";
    quizSection.style.display = "none";
    gameoverSection.style.display = "block";
    highscoreSection.style.display = "none";

    // declaring the submit btn
    var submitBtn = document.getElementById("form");

    // displays the final time "Your final score is " timerTime
    timeText = document.getElementById("time");
    timeText.textContent = timerTime;

    // when the submitbtn is activated, run submitInitials
    submitBtn.addEventListener("submit", submitInitials);
}

// add new score to highscores
function submitInitials(event) {
    //prevents the page from reloading 
    event.preventDefault();

    // declares where to get the initals from
    var initialsInput = document.getElementById("initials-input");
    // sets initals to the value of initialsInput
    var initials = initialsInput.value;

    // create an object to set the name to the initals and the score to the timerTime
    var newHighscore = {
        name: initials,
        score: timerTime
    };

    // however, if the name is empty, set it to ??
    if (newHighscore.name === "") {
        newHighscore.name = "??";
    }
    // add the new Obj to the highscores array
    highscores.push(newHighscore);

    // set the highscores localStorage to the array of objs with JSON
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // display the highscores
    highscoreDisplay();
}

// displays the highscores, if that be from the view highscores or from the submit btn
function highscoreDisplay() {
    // display only the highscore section
    mainSection.style.display = "none";
    quizSection.style.display = "none";
    gameoverSection.style.display = "none";
    highscoreSection.style.display = "block";

    // remove the header (view highscores and timer text elements)
    var header = document.getElementById("header");
    header.style.display = "none";

    // get the html element where the highscores to be displayed
    var highscoreList = document.getElementById("highscores-list");
    // sort the scores from highest to lowest
    var sortedScores = highscores.sort(function (a, b) {
        return b.score - a.score
    });

    // loops through and adds each initial and score to the screen
    for (let i = 0; i < sortedScores.length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = (i + 1) + ". " + sortedScores[i].name + " - " + sortedScores[i].score;
        highscoreList.appendChild(scoreItem);
    }


    // sets the back btn to go back to the main page when clicked
    var backBtn = document.getElementById("go-back");
    backBtn.addEventListener("click", function () {
        // by reloading the page
        location.reload();
    });

    // set the clear btn, and clears out localstorage and removing all the list of highscores
    var clearBtn = document.getElementById("clear-highscores");
    clearBtn.addEventListener("click", function () {
        localStorage.clear();
        highscoreList.remove();
    });
}
// calls page to start
initialise();