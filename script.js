let available = 9
let turn = 0;
let content = ""

const boxes = document.querySelectorAll('.box')

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (available <= 0) {
      return
    }

    if (turn % 2 === 0) {
      content = 'x'
    }
    else {
      content = 'o'
    }
    box.textContent = content;
    available--;
    turn++;
  })
})