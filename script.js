// No code outside this IIFE
(function() {
    // Gameboard Object
    const GameBoard = function() {
      let gameboard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]

      const getGameBoard = () => { return gameboard }
      const resetGameBoard = () => {
        gameboard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      }

      const setGameBoardValue = (row, col, mark) => {
        gameboard[row][col] = mark
      }

      return {getGameBoard, resetGameBoard, setGameBoardValue}
    }

    // Player objects
    const Player = function(name, mark) {
      let turn = false;

      return {name, mark, turn}
    }

    // Game
    const Game = () => {
      let availableSpace = 9;
      let content = '';
      let turn = '';

      let board = GameBoard();
      let p1 = Player("Player1",  'x')
      let p2 = Player("Player2", 'o')

      // document variables
      const boxes = document.querySelectorAll('.box');

      boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
          console.log(index)
        })
      })

      function playGame() {
        console.log(p1.name, p1.mark, p1.turn)
        console.log(p2.name, p2.mark, p2.turn)
      }

      return { playGame }
    }

    // Main Code
    const play = Game();
    play.playGame()
})()




/*
const boxes = document.querySelectorAll('.box')

document.addEventListener('dragstart', (e) => e.preventDefault())

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (available <= 0) {
      return
    }

    if (!box.classList.contains('taken')) {
      if (turn % 2 === 0) {
        content = 'x'
      }
      else {
        content = 'o'
      }
      box.textContent = content;
      box.classList.add("taken")
      available--;
      turn++;
    }
  })
})

*/
