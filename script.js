// No code outside this IIFE
(function() {
    // Gameboard Object
    const GameBoard = function() {
      let gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]

      const getGameBoard = () => { return gameboard }

      const resetGameBoard = () => {
        gameboard = [["", "", ""], ["", "", ""], ["", "", ""]]
      }

      const setGameBoardValue = (row, col, mark) => {
        gameboard[row][col] = mark
      }

      return { getGameBoard, resetGameBoard, setGameBoardValue }
    }

    // Player objects
    const Player = function(name, mark) {
      let turn = false;
      return {name, mark, turn}
    }

    // DOM Elements
    const playerDisplay =  document.querySelector('.players')

    const boxes = document.querySelectorAll('.box');
    const btnReset = document.querySelector('.reset');

    const modal = document.querySelector('.modal')
    const modalContent =  document.querySelector('.modal-content')
    const overlay = document.querySelector('.overlay')


    // Lines 
    const lineRow1 = document.querySelector('.line-row1')
    const lineRow2 = document.querySelector('.line-row2')
    const lineRow3 = document.querySelector('.line-row3')

    const lineCol1 = document.querySelector('.line-col1')
    const lineCol2 = document.querySelector('.line-col2')
    const lineCol3 = document.querySelector('.line-col3')

    const lineDiag1 = document.querySelector('.line-diag1')
    const lineDiag2 = document.querySelector('.line-diag2')

    // Game
    const Game = () => {
      let availableSpace = 9;
      let clickable = true;
      let turn = '';
      let gameover = false;

      let board = GameBoard();
      let p1 = Player("Player 1", 'x')
      let p2 = Player("Player 2", 'o')

      const p1Display = document.querySelector('#p1')
      const p2Display = document.querySelector('#p2')

      // Event listener
      document.addEventListener('dragstart', (e) => e.preventDefault())
      btnReset.onclick = reset;
      overlay.onclick = () => {
        if (clickable === true) {
          hidePopUP()
          reset()
        }
      }

      // private functions
      function whoseFirstTurn() {
        if (turn === '') {
          let randomBool = Math.random() < 0.5;
          if (randomBool === true) {
            p1.turn = true;
            p2.turn = false;
            p1Display.classList.add('turn')
            p2Display.classList.remove('turn')
          }
          else {
            p1.turn = false;
            p2.turn = true;
            p2Display.classList.add('turn')
            p1Display.classList.remove('turn')
          }
        }
      }

      function nextTurn() {
        let mark = ""
        if (p1.turn) {
          p1.turn = false
          p2.turn = true
          mark = p1.mark

          p1Display.classList.remove('turn')
          p2Display.classList.add('turn')
        }
        else if (p2.turn) {
          p1.turn = true
          p2.turn = false
          mark = p2.mark
  
          p1Display.classList.add('turn')
          p2Display.classList.remove('turn')
        }

        return mark;
      }

      function checkWinCondition() {
        let grid = board.getGameBoard();
        _checkHorizontal(grid)
        _checkVertical(grid)
        _checkDiagonal(grid)
      }

      function _checkHorizontal(grid) {
        const row1 = [grid[0][0], grid[0][1], grid[0][2]]
        const row2 = [grid[1][0], grid[1][1], grid[1][2]]
        const row3 = [grid[2][0], grid[2][1], grid[2][2]]

        placement = "row"
        _checkSimilarities(row1, row2, row3)

      }

      function _checkVertical(grid) {
        const col1 = [grid[0][0], grid[1][0], grid[2][0]]
        const col2 = [grid[0][1], grid[1][1], grid[2][1]]
        const col3 = [grid[0][2], grid[1][2], grid[2][2]]

        placement = "column"
        _checkSimilarities(col1, col2, col3)
      }

      function _checkDiagonal(grid) {
        const diagonal1 = [grid[0][0], grid[1][1], grid[2][2]]
        const diagonal2 = [grid[0][2], grid[1][1], grid[2][0]]

        placement = "diagonal"
        _checkSimilarities(diagonal1, diagonal2)
      }

      function _checkSimilarities(...arrays) {
        arrays.forEach((array) => {
          if (array.every(val => val == 'x') || array.every(val => val == 'o')) {

            if (array.includes("x")) {
              winner = p1.name
            }
            else if (array.includes("o")){
              winner = p2.name
            }

            gameover = true
            clickable = false;

            setTimeout(() => {
              changeModalContent(`🎉 ${winner} wins! 🎉`)
              showPopUp();
              // reset();

              setTimeout(() => {  // Cause a delay to allow the pop up to fully show
                clickable = true;   
              }, 500)
            }, 500); 

            _showStreakLine(array, arrays);
          }
        })
      }

      function _showStreakLine(array, arrays) {
        // check what row or column were a streak will show
        if (placement === "row") {
          if (array === arrays[0]) {
            lineRow1.classList.add('show')
          }
          if (array === arrays[1]) {
            lineRow2.classList.add('show')
          }
          if (array === arrays[2]) {
            lineRow3.classList.add('show')
          }
        }

        else if (placement === "column") {
          if (array === arrays[0]) {
            lineCol1.classList.add('show')
          }
          if (array === arrays[1]) {
            lineCol2.classList.add('show')
          }
          if (array === arrays[2]) {
            lineCol3.classList.add('show')
          }
        }
        else if (placement === "diagonal") {
          if (array === arrays[0]) {
            lineDiag1.classList.add('show')
          }
          if (array === arrays[1]) {
            lineDiag2.classList.add('show')
          }
        }
      }

      function reset() {
        const allLines = document.querySelectorAll('.streak-lines > div')
        allLines.forEach(lines => {
          lines.classList.remove('show')
        })

        board.resetGameBoard();
        boxes.forEach(box => {
          box.textContent = "";
          box.classList.remove('taken')
        })

        turn = "";
        availableSpace = 9
        gameover = false;
        whoseFirstTurn();
      }

      function showPopUp() {
        overlay.classList.add('show')
        modal.classList.add('show')
        playerDisplay.classList.add('hide')
      }

      function hidePopUP() {
        overlay.classList.remove('show')
        modal.classList.remove('show')
        playerDisplay.classList.remove('hide')
      }

      function changeModalContent(text) {
        modalContent.textContent = text;
      }

      function drawOnBoard() {
        boxes.forEach((box) => {
          box.addEventListener("click", () => {
            if (gameover === true) return
            if (box.classList.contains('taken')) return; // prevent changing already taken boxes

            let row = box.getAttribute("data-row")
            let col = box.getAttribute("data-col")

            mark = nextTurn();
            board.setGameBoardValue(row, col, mark)
  
            box.textContent = mark;
            box.classList.add('taken')
            availableSpace--;
            checkWinCondition();
            if (availableSpace <= 0 && gameover === false) {
              clickable =  false;
              setTimeout(() => {
                changeModalContent("It's a Tie 🤝")
                showPopUp();
                setTimeout(() => {  // Cause a delay to allow the pop up to fully show
                  clickable = true;   
                }, 200)
              }, 200);
            }
          })
        })
      }

      function playGame() {
        whoseFirstTurn();
        drawOnBoard();
      }

      return { playGame }
    }

    // Main Code
    const play = Game();
    play.playGame()
})()
