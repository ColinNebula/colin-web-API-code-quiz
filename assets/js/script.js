console.log('outside');
var mainEl = document.getElementById('main');
var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var countEl = document.getElementById('count');
var question1El = document.getElementById('question1');


// The count element
var countEl = document.querySelector('#count');
// The variable for count
var count = 0;

console.log('inside');

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
      location.replace('index1.html');
    }
  }, 1000);
}






startBtn.onclick = countdown;
console.log('outside');

