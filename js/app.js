//universal variables
var matches = 0;
var moves = 0;
var moveCounter = parseInt(document.getElementById("moves").innerText,10);
var modalStars = 3;

//shuffle function, restarts entire board
function shuffle(array) {
  var nodeList = document.querySelectorAll('.card');
  var array = Array.from(nodeList);
  var currentIndex = array.length, temporaryValue, randomIndex;
  var board = document.getElementById("deck");

  // resets counting values
  matches = 0;
  moveCounter = 0;
  const stars = document.querySelectorAll('.stars i');
    for (star of stars) {
        star.classList.remove("hideStar");
    }
  //adds back the listener to start timer on first click
  document.getElementById("deck").addEventListener("click", startTimer);
  resetTimer();
  document.getElementById("timerLabel").innerHTML = "00:00";

  //resets modal star display
  var endStar = document.getElementById("endStar");
  while (endStar.firstChild) {
      endStar.removeChild(endStar.firstChild);
  }

  document.getElementById("moves").innerHTML = moveCounter;
  board.classList.toggle("shake");
  board.classList.remove("rotateOut");

    // Shuffle function from http://stackoverflow.com/a/2450976
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    //rewrites HTML accourding to shuffle, resets all initial classes
    for (i=0; i < array.length; i++) {
        var deck = document.getElementById('deck');
        array[i].classList.remove("open","match","flipInY");
        deck.appendChild(array[i]);
    }
}

// open card on click
var cards = document.getElementsByClassName("card");
var pairs = [];

for (const card of cards) {
    card.addEventListener("click", function(){
      this.classList.toggle("open");
      this.classList.add("flipInY");

      //add clicked card to checkMatch list
      pairs.push(card);
      if (pairs.length === 2) {
        countMoves();
        matchChecker();
      }
  })
}

//keeps track of number of moves, changes star count
function countMoves() {
  moveCounter += 1;
  document.getElementById("moves").innerHTML = moveCounter;
  if (moveCounter >= 10 && moveCounter < 17) {
    document.getElementById("thirdStar").classList.add("hideStar");
    modalStars = 2;
  }
  else if (moveCounter >= 17) {
    document.getElementById("secondStar").classList.add("hideStar");
    modalStars = 1;
  }
}

//checks if the two cards opened match
function matchChecker() {

  //if cards match
  if (pairs[0].innerHTML === pairs[1].innerHTML) {
    for (const pair of pairs) {
      pair.classList.toggle("match");
    }
    pairs = [];
    matchCount();
  }

  //if cards are mismatched
  else {
    for (const pair of pairs) {
        pair.classList.toggle("wrong");
        setTimeout(function(){
          pair.classList.remove("open", "wrong");
        }, 700);
        setTimeout(function(){
          pair.classList.remove("flipInY");
        }, 700);
      }
    pairs = [];
  }
}

//keeps count of matches to determine end of game
function matchCount() {
  matches += 1;
  if (matches == 8) {
    gameEnd();
  }
}

//hide board when all cards are paired, congratulate winner and ask to play again
function gameEnd() {
  stopTimer();
  document.querySelector(".end-modal").classList.toggle("show-modal");
  document.querySelector("#endMoves").innerHTML = moveCounter;
  document.querySelector("#endTime").innerHTML = document.getElementById("timerLabel").innerHTML;
  addModalStars();
}

//add stars to modal display at the end of the game
function addModalStars(){
  for (i=0; i < modalStars; i++) {
    var newStar = document.createElement("i");
    document.getElementById("endStar").appendChild(newStar);
    newStar.classList.add("fa","fa-star");
  }
}

//starts a new game when playAgain button is pressed
function newGame() {
  document.querySelector(".end-modal").classList.toggle("show-modal");
  shuffle();
}

// closes modal window after no thanks button is clicked
function endGame() {
  document.querySelector(".end-modal").classList.toggle("show-modal");
}

// timer functions
var status = 0;
var time = 0;

function startTimer() {
  //remove listener that started the timer on first click
  document.getElementById("deck").removeEventListener("click", arguments.callee)
  status = 1;
  timer();
}

function stopTimer() {
  status = 0;
}

function resetTimer() {
  status = 0;
  time = 0;
}

function timer() {
  if (status == 1) {
    setTimeout(function(){
      time++;
      var min = Math.floor(time/100/60);
      var sec = Math.floor(time/100);

      if (min < 10) {
        min = "0" + min;
      }

      if (sec >= 60) {
        sec = sec % 60;
      }

      if (sec < 10) {
        sec = "0" + sec;
      }

      document.getElementById("timerLabel").innerHTML = min + ":" + sec;
      timer();
    },10);
  }
}
//reset game when reset button is clicked
document.getElementById("reset").addEventListener("click", shuffle);
// shuffle and reset board for new game on modal view
document.getElementById("playAgain").addEventListener("click", newGame);
// close modal window and show all cards from previous game
document.getElementById("endHere").addEventListener("click", endGame);
// starts timer on first card click
document.getElementById("deck").addEventListener("click", startTimer);
