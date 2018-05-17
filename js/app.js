var matches = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var nodeList = document.querySelectorAll('li.card');
  var array = Array.from(nodeList);
  var currentIndex = array.length, temporaryValue, randomIndex;
  matches = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

// resets entire board with new cards

    for (i=0; i < array.length; i++) {
        var deck = document.getElementById('deck');
        array[i].classList.remove("open","match");
        deck.appendChild(array[i]);
    }
}

// display the card's symbol

var cards = document.getElementsByClassName("card");
var pairs = [];

for (const card of cards) {
    card.addEventListener("click", function(){
      this.classList.toggle("open");
      //add clicked card to checkMatch list
      pairs.push(card);
      if (pairs.length == 2) {
        matchChecker();
      }
  })
}

function matchChecker() {
  if (pairs[0].innerHTML === pairs[1].innerHTML) {
    for (const pair of pairs) {
      pair.classList.toggle("match");
    }
    pairs = [];
    matchCount();
  }
  else {
    for (const pair of pairs) {
        pair.classList.toggle("wrong");
        setTimeout(function(){
          pair.classList.remove("open", "wrong");
        }, 500);
      }
    pairs = [];
  }
}

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
