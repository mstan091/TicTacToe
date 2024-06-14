const tttBoard = document.querySelector("#tttBoard");
console.log(tttBoard)
const message = document.querySelector("#message");
console.log(message)
const boardCells = [
  "","","",
  "","","",
  "","",""
];

let move = "circle";

// message.textContent = "Test"

function createGame() {
    boardCells.forEach((_cell,index) => {
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
    })
}

function squareClicked(e) {
  // console.log(e.target); // contains the square which was pressed
  // Create the div and give it the class "circle" or "cross"
  const divDisplay = document.createElement('div');
  divDisplay.classList.add(move);
  e.target.append(divDisplay);
  move = move === "circle" ? "cross" : "circle" // change from circle to cross
  // console.log(move);
  message.innerHTML = "Next is " + move + "'s turn";
  // Need to remove the eventListener so that we don;t click twice on the same square.
  e.target.removeEventListener("click", squareClicked); // remove event listener, you cannot click two times on the same div
  verifyScore();
}

function verifyScore() {
  // Get all the squares from the board 
  const allSquares = document.querySelectorAll(".square");
  let count=0;
  // list all the winning combinations
  const winComb = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ]

  winComb.forEach(array => {
    // Verify for each index of the array if it contains *only* circles
    count=0;
    array.forEach(cell => {
      // For each cell, verify allSquares[cell] is if has a child and if the child is circle
      squareChild=allSquares[cell].firstChild;
      if (squareChild) {
        if (squareChild.classList.contains("circle")){
          count=count+1;
        }
      } 
    })
    if (count == 3) {
      message.innerHTML = "CIRCLE IS THE WINNER!";
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
    }
  })

  winComb.forEach(array => {
    // Verify for each index of the array if it contains *only* circles
    count=0;
    array.forEach(cell => {
      // For each cell, verify allSquares[cell] is if has a child and if the child is circle
      squareChild=allSquares[cell].firstChild;
      if (squareChild) {
        if (squareChild.classList.contains("cross")){
          count=count+1;
        }
      } 
    })
    if (count == 3) {
      message.innerHTML = "CROSS IS THE WINNER!";
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
    }
  })

  // winComb.forEach(array => {
  //   const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"));
  //   if (circleWins) {
  //     infoDisplay.textContent = "Circle Wins";
  //     // Remove all event listeners
  //     allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
  //   }
  // })

  // winningCombos.forEach(array => {
  //   const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"));
  //   if (crossWins) {
  //     infoDisplay.textContent = "Cross Wins";
  //     allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
  //   }
  // })
  
}

createGame();