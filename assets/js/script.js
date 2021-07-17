var body = document.body;
var count = 0;
var question1 = page1();
var answer1 = rightAnswer("string");
var question2 = page2();
var answer1 = rightAnswer("parantheses");


var countEl = document.querySelector('#count');
var timerEl = document.getElementById('countdown');
var startBtn= document.getElementById('startQuiz');



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
      displayMessage();
    }
  }, 1000);
}



function page1() 
{
    window.location = "file:///Z:/Directory/projects/my-webAPI-code-quiz/index1.html"
}

function page2() 
{
    window.location = "file:///Z:/Directory/projects/my-webAPI-code-quiz/index2.html"
}

function page3() 
{
    window.location = "file:///Z:/Directory/projects/my-webAPI-code-quiz/index3.html"
}


startBtn.onclick = countdown;