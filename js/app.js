//universal variables
var matches = 0;
var moves = 0;
var moveCounter = parseInt(document.getElementById("moves").innerText,10);

//shuffle function, restarts entire board
function shuffle(array) {
  var nodeList = document.querySelectorAll('.card');
  var array = Array.from(nodeList);
  var currentIndex = array.length, temporaryValue, randomIndex;

  // resets counting values
  matches = 0;
  moveCounter = 0;
  const stars = document.querySelectorAll('.stars i');
    for (star of stars) {
        star.classList.remove("hideStar");
    }

  document.getElementById("moves").innerHTML = moveCounter;
  document.getElementById("deck").classList.toggle("shake");

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
  if (moveCounter >= 9 && moveCounter < 12) {
    document.getElementById("thirdStar").classList.add("hideStar");
  }
  else if (moveCounter >= 12) {
    document.getElementById("secondStar").classList.add("hideStar");
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
  if (matches == 1) {
    console.log("you won the game!");
  }
}

//reset game when reset button is clicked
document.getElementById("reset").addEventListener("click", shuffle);










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
