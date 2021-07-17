//Global Variables
var body = document.body;
var stringsCounter = 0;
var booleanCounter = 0;
var alertsCounter = 0;
var numbersCounter = 0;
var counter = 0;
var h1El = document.createElement('h1');

var h1El = 'Welcome';




var countEl = document.querySelector('#count');
var timerEl = document.getElementById('countdown');
var startBtn= document.getElementById('startQuiz');

// Add a centered h2
var h2El = document.createElement('h2');
h2El.textContent =
  'Try to answer the following code-related questions within the time limit. Keep in mind that incorect answers will penalize your score/time by ten seconds!';
h2El.setAttribute('style', 'margin:auto; width:100%; text-align:center;');
body.appendChild(h2El);



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
      alert("let's begin")
    }
  }, 1000);
}


//function page1() 
//{
    //window.location = "file:///Z:/Directory/projects/my-webAPI-code-quiz/index1.html"
//}


startBtn.onclick = countdown;
console.log("start button pressed");
