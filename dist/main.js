document.querySelectorAll('.board').forEach((board, index) => {
  for(let r = 0; r < 10; r++) {
    const row = document.createElement('div');
    row.textContent = r + 1;
    row.classList.add('board-label');
    board.appendChild(row);
    for(let c = 0; c < 10; c++) {
      const square = document.createElement('div');
      square.classList.add(index === 0 ? 'user' : 'computer');
      square.classList.add('space');
      square.dataset.row = r;
      square.dataset.column = c;
      board.appendChild(square);
    }
  }
});