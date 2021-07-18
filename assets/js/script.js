//Global Variables
console.log('start button pressed');
var body = document.body;
var timeLeft = 60;
var timeCounter = document.getElementById("time");
var scoreWrapper = document.getElementById("score-board");

var nextQuestion = document.getElementById("q-btn");
var introText = document.getElementById("intro-text");
var firstSection = document.getElementById("start-div");
var description = document.getElementById("info");
var startEl = document.querySelector("btn");
var currentSet = [];
var questionNum = 0;
var scoreArray = [];
var startBtn = document.getElementById("countdown");
var startBtn = document.getElementById('startQuiz');
var answerBtns = document.querySelector("answers");


// Timer that counts down from 5
function countdown() {
  var timeLeft = 5;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      //displayMessage();
      endCountdown();
    }
  }, 1000);
}

startBtn.onclick = countdown;

console.log('start button pressed');


//startBtn.addEventListener('click', countdown);
//start.addEventListener('click', startQuiz);