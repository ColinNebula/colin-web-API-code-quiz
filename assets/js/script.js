// var questions = [{
//   questionText: "Commonly used data types DO NOT included?", 
//   answers: ["1. Strings", "2.Boolean", "3.Alerts", "4. Numbers"],
//   correct: "3.Alerts"
// },{
//   questionText: "Commonly used data types DO NOT included?", 
//   answers: ["1. Strings", "2.Boolean", "3.Alerts", "4. Numbers"],
//   correct: "3.Alerts"
// },{
//   questionText: "Commonly used data types DO NOT included?", 
//   answers: ["1. Strings", "2.Boolean", "3.Alerts", "4. Numbers"],
//   correct: "3.Alerts"
// },{
//   questionText: "Arrays in Javascript can be used to store ____.", 
//   answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
//   correct: "3.Alerts"
// },
// ];

// var questionEl = document.getElementById("question");
// var questionNumber = 0


// // here  display the first question
// function displayQuestion() {
//   questionEl.textContent = questions[questionNumber].questionText
//   // print answers
// }
// displayQuestion();





// // $(document).ready(function(){
// //   $(".btn").click(function(){
// //     $("h3").hide();
// //   });
  
// // });

// Variables
var ViewHighScoreEl = document.getElementById("view-high-scores");
var timerEl = document.getElementById("timer");
var startQuizContainerEl = document.getElementById("start-quiz-container");
var startButtonEl = document.getElementById("start-game");

var questionContainerEl = document.getElementById("question-container");
var questionDivEl = document.getElementById("question-div");
var questionTextEl = document.getElementById("question-text");
var answerbuttonsEl = document.getElementById("answer-buttons");

var ansKeyContainerEl = document.getElementById("answer-key-container");
var rightAnswerEl = document.getElementById("right-ans");
var wrongAnswerEl = document.getElementById("wrong-ans");
var ansGoodEl = document.getElementById("ans-good");
var endQuizContainerEl = document.getElementById("end-quiz-container");
var formSubmitScore = document.getElementById("submit-score-form");
var finalScoreValueEl = document.getElementById("final-score-value");


var hiScoresContainerEl = document.getElementById("high-scores-container");
var listHighScoreEl = document.getElementById("high-score-list");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")

// Global variables
const TIME_LIMIT = 120;
var curquestion = 0; // tracks the current question
var timeLeft = 0; // the time left in the quiz, starts at 120 seconds
const penalty = 10; // seconds penalized for wrong answers
var timerInterval = 0;
var gameOver = false;
var finalScore = 0;
var highScoresArray = [];
var quizQuestions = [];

// check that question bank is loaded from questions.js
console.log(questionBank);

function initializeQuiz() {
  curquestion = 0;
  timeLeft = TIME_LIMIT;
  timerInterval = 0;
  gameOver = false;
  finalScore = 0;
  highScoresArray = [];
  loadHighScore();

  quizQuestions = shuffle(questionBank).slice(0, 10);
  console.log(quizQuestions);
}

function startQuiz() {
  // Initialize, start the clock, then show the first quiz question
  initializeQuiz();
  showElement(startQuizContainerEl, false);
  startTimer();
  resetQuestionContainer();
  displayQuestion(curquestion);
}

// Displays the question and answer choices from the quizQuestions array at the given index
var displayQuestion = function (index) {
  questionTextEl.innerText = "" + (index + 1) + ". " + quizQuestions[index].question;
  var answerbutton;
  for (var i = 0; i < quizQuestions[index].choices.length; i++) {
    answerbutton = document.createElement("button");
    answerbutton.innerText = quizQuestions[index].choices[i];
    answerbutton.classList.add("btn");
    answerbutton.classList.add("answerbtn");
    answerbutton.addEventListener("click", checkAnswer);
    answerbuttonsEl.appendChild(answerbutton);
  }
  showElement(questionContainerEl, true);
};

//check if answer is correct
var checkAnswer = function (event) {
  var selectedAnswer = event.target.innerText;
  var goodAnswer = quizQuestions[curquestion].choices[quizQuestions[curquestion].ans];
  console.log("selected answer = " + selectedAnswer);
  console.log("correct answer = " + goodAnswer);

  
  if (selectedAnswer === goodAnswer) {
    console.log("Correct answer chosen!!");
    showAnswerRightOrWrongMessage(curquestion, true);
  } else {
    console.log("Wrong answer chosen!!");
    showAnswerRightOrWrongMessage(curquestion, false);
    applyPenalty();
  }

  curquestion++;
  if (curquestion < quizQuestions.length) {
    resetQuestionContainer();
    displayQuestion(curquestion);
  } else {
    gameOver = true;
    finalScore = timeLeft;

    // show the scores container
    showEndQuizContainer(finalScore);
  }
};
// show quiz container
function showStartQuizContainer() {
  showElement(questionContainerEl, false);
  showElement(ansKeyContainerEl, false);
  showElement(hiScoresContainerEl, false);
  showElement(endQuizContainerEl, false);
  showElement(startQuizContainerEl, true);
}

// Quiz container
function showEndQuizContainer(finalScore) {
  finalScoreValueEl.innerHTML = " " + finalScore;

  showElement(startQuizContainerEl, false);
  showElement(questionContainerEl, false);
  showElement(ansKeyContainerEl, false);
  showElement(hiScoresContainerEl, false);
  showElement(endQuizContainerEl, true);
}

//create high score values
var saveHighScore = function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

  // reset 
  formSubmitScore.reset();

  
  addToHighScores(initials, finalScore);

  saveHighScoresToLocalStorage(highScoresArray);

  setupHighScoresContainer(highScoresArray);

  showHighScoresContainer();
};
// view high score
function viewHighScores() {
    console.log("In viewHighScores " + highScoresArray);

    // create the list elements to show the high scores
    setupHighScoresContainer(highScoresArray);

    // show the high scores container
    showHighScoresContainer();
}

var clearHighScores = function (event) {
  event.preventDefault();
  localStorage.clear();
  clearHighScoresList();
  initializeQuiz();
  timerEl.textContent = TIME_LIMIT;
}

//clear all high scores list items
function clearHighScoresList() {
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }
}
// set up high score
function setupHighScoresContainer(hiScrArr) {
  clearHighScoresList();

  // create high score
  for (var i = 0; i < hiScrArr.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML = hiScrArr[i].userName + " - " + hiScrArr[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }
}

// display highscore
function showHighScoresContainer() {
  showElement(startQuizContainerEl, false);
  showElement(questionContainerEl, false);
  showElement(endQuizContainerEl, false);
  showElement(ansKeyContainerEl, false);
  showElement(hiScoresContainerEl, true);
}

// add to the highscore
function addToHighScores(initials, finScore) {
  var lastHighScoreAdded = {
    userName: initials,
    score: finScore,
  };

  highScoresArray.push(lastHighScoreAdded);

  highScoresArray.sort((a, b) => {
    return b.score - a.score;
  });

  return lastHighScoreAdded;
}

// load highscore
function loadHighScore() {
  var loadedHighScores = localStorage.getItem("HighScores")
      if (!loadedHighScores) {
      return;
  }

  highScoresArray = JSON.parse(loadedHighScores);
  console.log('loaded high scores from local storage: ', highScoresArray);

  highScoresArray.sort((a, b) => {
    return b.score - a.score;
  });
}

//save high scores to local storage
function saveHighScoresToLocalStorage(hiScAr) {
  localStorage.setItem("HighScores", JSON.stringify(hiScAr));
}

// reset question
function resetQuestionContainer() {
  questionTextEl.innerText = "";
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild);
  }
}

// check the status of the answer: "Correct" or "Wrong"
function showAnswerRightOrWrongMessage(questionIdx, booleanRight) {
  if (booleanRight) {
    ansGoodEl.innerHTML = "" + (questionIdx + 1) + ". " + "Correct &#9989";
    showElement(ansKeyContainerEl, true);
  } else {
    ansGoodEl.innerHTML = "" + (questionIdx + 1) + ". " + "Wrong &#10060";
    showElement(ansKeyContainerEl, true);
  }
}

// penalty for a wrong answer is to reduce 10 seconds from the clock.
function applyPenalty() {
  timeLeft = timeLeft - penalty;
  if (timeLeft <= 0) {
    timeLeft = 0;
  }
}

function showElement(elt, booleanShow) {
  if (elt.classList.contains("show")) {
    elt.classList.remove("show");
  }

  if (elt.classList.contains("hide")) {
    elt.classList.remove("hide");
  }

  if (booleanShow) {
    elt.classList.add("show");
  } else {
    elt.classList.add("hide");
  }
}

// time remaining
function showTimeLeft() {
  if (gameOver || timeLeft <= 0) {
    stopTimer();
  }
  timerEl.textContent = timeLeft;
  timeLeft--;
}

// stop the quiz timer
function stopTimer() {
  clearInterval(timerInterval);
}

// update the countdown timer 
function startTimer() {
  timerInterval = setInterval(showTimeLeft, 1000);
}



// Event listers
startButtonEl.addEventListener("click", startQuiz);

// When the for submit button is clicked on the submit-score form
formSubmitScore.addEventListener("submit", saveHighScore);

ViewHighScoreEl.addEventListener("click", viewHighScores);

btnGoBackEl.addEventListener("click", showStartQuizContainer);

btnClearScoresEl.addEventListener("click", clearHighScores)


// shuffle method.
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}