// TO DO, TIMER, GAME OVER(diffent section game-over?) 
// AND HIGHSCORES(might be on another html page, might just have it as a section like the rest of it [highscores?] - localstorage)
// little text at the bottom of the page saying correct and wrong

var startBtn = document.getElementById("start-button");

var mainSection = document.getElementById("main");
var quizSection = document.getElementById("quiz");

var pageCounter = 0;

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

    // starts the quiz from the main page
    startBtn.addEventListener("click", function () {
        mainSection.style.display = "none";
        quizSection.style.display = "block";
        // start timer
        generateQuiz();
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
        var btn = document.createElement("button");
        btn.innerText = answers[i];
        // btn.setAttribute("data-answer", answers[i]);

        btn.addEventListener("click", function () {
            // if pageCounter is not => 5;
            if (event.target.innerText === correctAnswer) {
                alert("woot");

                generateQuiz();
                // message at bottom "Correct!"
            }
            else {
                alert("shit");

                generateQuiz();

                //take 5 sec from timer
                // message at bottom "Wrong!"
            }
        });

        // add button to the page
        answerDiv.appendChild(btn);
    }
}



// calls page to start
initialise();