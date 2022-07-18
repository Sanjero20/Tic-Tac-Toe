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

    // Game
    const Game = () => {
      // let availableSpace = 9;
      let turn = '';

      let board = GameBoard();
      let p1 = Player("Player1", 'x')
      let p2 = Player("Player2", 'o')

      const p1Display = document.querySelector('#p1')
      const p2Display = document.querySelector('#p2')

      // document variables
      const boxes = document.querySelectorAll('.box');
      const btnReset = document.querySelector('.reset');
      btnReset.onclick = reset;

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

        _checkSimilarities(row1, row2, row3)

      }

      function _checkVertical(grid) {
        const col1 = [grid[0][0], grid[1][0], grid[2][0]]
        const col2 = [grid[0][1], grid[1][1], grid[2][1]]
        const col3 = [grid[0][2], grid[1][2], grid[2][2]]

        _checkSimilarities(col1, col2, col3)
      }

      function _checkDiagonal(grid) {
        const diagonal1 = [grid[0][0], grid[1][1], grid[2][2]]
        const diagonal2 = [grid[0][2], grid[1][1], grid[2][0]]

        _checkSimilarities(diagonal1, diagonal2)
      }

      function _checkSimilarities(...arrays) {
        arrays.forEach(array => {
          if (array.every(val => val == 'x') || array.every(val => val == 'o')) {
            setTimeout(() => {
              alert('winner')
              reset();
            }, 200); 
          }
        })
      }

      function reset() {
        board.resetGameBoard();
        boxes.forEach(box => {
          box.textContent = "";
          box.classList.remove('taken')
        })

        turn = "";
        whoseFirstTurn();
      }

      function drawOnBoard() {
        boxes.forEach((box) => {
          box.addEventListener("click", () => {
            console.clear();
            if (box.classList.contains('taken')) return; // prevent changing already taken boxes

            let row = box.getAttribute("data-row")
            let col = box.getAttribute("data-col")

            mark = nextTurn();
  
            board.setGameBoardValue(row, col, mark)
  
            box.textContent = mark;
            box.classList.add('taken')

            checkWinCondition();
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
