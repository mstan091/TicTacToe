const tttBoard = document.querySelector("#tttBoard");
console.log(tttBoard);
const message = document.querySelector("#message");
console.log(message);
const tallyDisplay = document.querySelector("#tally");
const boardCells = [
  "", "", "",
  "", "", "",
  "", "", ""
];

let move = "circle";
let circleWins = 0;
let crossWins = 0;
let draws = 0;

// Set initial message
message.innerHTML = "Circle starts";

function createGame() {
  boardCells.forEach((_cell, index) => {
    // for each cell element create a div
    const boardElement = document.createElement("div");
    // for each div add a class "square"
    boardElement.classList.add("square");
    // for each div set the id=index
    boardElement.id = index;
    // for *each* div add event listener "click" which calls addGo()
    boardElement.addEventListener("click", squareClicked);
    // append
    tttBoard.appendChild(boardElement);
  });
}

function squareClicked(e) {
  // console.log(e.target); // contains the square which was pressed
  // Create the div and give it the class "circle" or "cross"
  const divDisplay = document.createElement('div');
  divDisplay.classList.add(move);
  e.target.append(divDisplay);
  move = move === "circle" ? "cross" : "circle"; // change from circle to cross
  // console.log(move);
  message.innerHTML = "Next is " + move + "'s turn";
  // Need to remove the eventListener so that we don't click twice on the same square.
  e.target.removeEventListener("click", squareClicked); // remove event listener, you cannot click two times on the same div
  verifyScore();
}

function verifyScore() {
  // Get all the squares from the board 
  const allSquares = document.querySelectorAll(".square");
  let count = 0;
  let isDraw = true; // Flag to check if the game is a draw

  // List all the winning combinations
  const winComb = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // Check for circle wins
  winComb.forEach(array => {
    count = 0;
    array.forEach(cell => {
      const squareChild = allSquares[cell].firstChild;
      if (squareChild && squareChild.classList.contains("circle")) {
        count++;
      }
    });
    if (count === 3) {
      message.innerHTML = "CIRCLE IS THE WINNER!";
      highlightWinningSquares(array);
      allSquares.forEach(square => square.removeEventListener("click", squareClicked));
      isDraw = false; // Not a draw since we have a winner
      circleWins++; // Update circle wins tally
      updateTally(); // Update tally display
      showPlayAgainButton();
    }
  });

  // Check for cross wins
  winComb.forEach(array => {
    count = 0;
    array.forEach(cell => {
      const squareChild = allSquares[cell].firstChild;
      if (squareChild && squareChild.classList.contains("cross")) {
        count++;
      }
    });
    if (count === 3) {
      message.innerHTML = "CROSS IS THE WINNER!";
      highlightWinningSquares(array);
      allSquares.forEach(square => square.removeEventListener("click", squareClicked));
      isDraw = false; // Not a draw since we have a winner
      crossWins++; // Update cross wins tally
      updateTally(); // Update tally display
      showPlayAgainButton();
    }
  });

  // Check for a draw
  if (isDraw) {
    const allFilled = [...allSquares].every(square => square.firstChild);
    if (allFilled) {
      message.innerHTML = "It's a draw!";
      draws++; // Update draws tally
      updateTally(); // Update tally display
      showPlayAgainButton();
    }
  }
}

function showPlayAgainButton() {
  // Remove any existing play again button before creating a new one
  const existingButton = document.querySelector("#playAgainButton");
  if (!existingButton) {
    const playAgainButton = document.createElement("button");
    playAgainButton.id = "playAgainButton";
    playAgainButton.innerHTML = "Play again?";
    playAgainButton.addEventListener("click", resetGame);
    document.body.appendChild(playAgainButton);
  }
}

function resetGame() {
  // Clear the board and reset the message
  tttBoard.innerHTML = "";
  message.innerHTML = "Circle starts";
  move = "circle";
  
  // Remove the Play Again button
  const playAgainButton = document.querySelector("#playAgainButton");
  if (playAgainButton) {
    playAgainButton.remove();
  }

  // Recreate the game board
  createGame();
}

function updateTally() {
  tallyDisplay.innerHTML = `Circle: ${circleWins} - Cross: ${crossWins} - Draws: ${draws}`;
}

function highlightWinningSquares(winningArray) {
  winningArray.forEach(index => {
    const square = document.getElementById(index);
    square.classList.add("confetti"); // Add confetti class to the winning squares
  });
}

createGame();
