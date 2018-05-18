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
      if (pairs.length == 2) {
        countMoves();
        matchChecker();
      }
  })
}

//keeps track of number of moves, changes star count
function countMoves() {
  moveCounter += 1;
  document.getElementById("moves").innerHTML = moveCounter;
  if (moveCounter >= 10 && moveCounter < 15) {
    document.getElementById("thirdStar").classList.add("hideStar");
    modalStars = 2;
  }
  else if (moveCounter >= 15) {
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
  // var deck = document.getElementById('deck');
  // deck.classList.add("rotateOut");
  // document.getElementById("gameOver").style.display="block";
  // document.getElementById("reset").style.visibility="hidden";
  // document.getElementById("score-panel").classList.add("win");
  // prompt(matches);
  document.querySelector(".end-modal").classList.toggle("show-modal");
  document.querySelector(".end-modal span").innerHTML = moveCounter;
  addModalStars();
}

function addModalStars(){
  for (i=0; i < modalStars; i++) {
    var newStar = document.createElement("i");
    document.getElementById("endStar").appendChild(newStar);
    newStar.classList.add("fa","fa-star");
  }
}

//starts a new game when playAgain button is pressed
function newGame() {
  document.getElementById("gameOver").style.display="none";
  document.getElementById("score-panel").classList.remove("win");
  document.getElementById("reset").style.visibility="visible";
  shuffle();
}

//reset game when reset button is clicked
document.getElementById("reset").addEventListener("click", shuffle);
// document.getElementById("playAgain").addEventListener("click", newGame);









/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
