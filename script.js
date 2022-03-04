document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("game");
  let card1 = null;
  let card2 = null;
  let cardsFlipped = 0;
  let currentScore = 0;
  let noClicking = false;
  let flippedCards = document.getElementsByClassName("flipped")
  let gameBoard = document.querySelectorAll('div');
  let lowScore = localStorage.getItem("low-score");
  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
    "cyan",
    "black",
    "cyan",
    "black",
    "yellow"
  ];

  if (lowScore) {
    document.getElementById("best-score").innerText = "High Score: " + lowScore;
  }

  //button is hard coded on index.html with an id of 'startGame'
  //first select the button and add addEventListener
  const startbtn = document.querySelector("button#startBtn");
  //second select the restart button to toggle class
  const restartbtn = document.querySelector("button#restartBtn");
  restartbtn.setAttribute('style', 'display:none');


  // onClick startGame
  startbtn.addEventListener('click', function (e) {
    let currentScore = 0;
    //remove start button after clicking
    startbtn.remove("button");
    restartbtn.removeAttribute('style', 'display:none');
    function shuffle(array) {
      let counter = array.length;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      return array;
    }
    // END onClick startGame
    let shuffledColors = shuffle(COLORS);

    // this function loops over the array of colors
    // it creates a new div and gives it a class with the value of the color
    // it also adds an event listener for a click for each card
    function createDivsForColors(colorArray) {
      for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.setAttribute('style', "");
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
      }
    }
    createDivsForColors(shuffledColors)
  });

  //magic happens
  function handleCardClick(e) {
    if (noClicking) return;
    //if statement to disallow clicking on a div that contains the class 'flipped'
    if (e.target.classList.contains("flipped")) {
      return;
    }

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!card1 || !card2) {
      currentCard.classList.add("flipped");
      card1 = card1 || currentCard;
      //statement = card 2 deeply equals card1 if not null card2
      card2 = currentCard === card1 ? null : currentCard;
    }
    // if two cards were clicked, declare variable for each card's classname, then if both classNames are deeply equal to each other, cards flipped is adds two or is equal to two, remove the removeEventListener and reset the states
    if (card1 && card2) {
      noClicking = true;
      setScore(currentScore + 1);
      // debugger
      let gif1 = card1.className;
      let gif2 = card2.className;

      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        noClicking = false;
      }
      //if two cards were clicked, declare variable for each card's classname, then if both classNames are NOT deeply equal to each other remove styles, flipped class and reset states and disable noclicking after 1 second
      else {
        setTimeout(function () {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          noClicking = false;
        }, 1000);
      }
    }
    // if the number of cards flipped are equal to the length of the array COLORS then the game is over. 
    if (cardsFlipped === COLORS.length) endGame();
  }

  function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("current-score").innerText = `Current Score:  ${currentScore}`;
  }

  function endGame() {
    let end = document.getElementById("end");
    let scoreHeader = end.children[1];
    scoreHeader.innerText = "Your score: " + currentScore;
    let lowScore = +localStorage.getItem("low-score") || Infinity;
    if (currentScore < lowScore) {
      scoreHeader.innerText += " - NEW HIGH SCORE!!";
      localStorage.setItem("low-score", currentScore);
    }
    document.getElementById("end").classList.add("game-over");
  }
  restartbtn.addEventListener('click', function (e) {
    setTimeout(() => {
      window.location.reload(true);
    }, 1000)
  })
});

