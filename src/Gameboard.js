import Ship from "./Ship";

const Gameboard = (rows, columns) => {
  let board = [];
  for(let r = 0; r < rows; r++) {
    board[r] = [];
    for(let c = 0; c < columns; c++) {
      board[r][c] = {
        attacked: false,
        ship: null
      };
    }
  }

  const place = (row1, col1, row2, col2) => {
    if(row1 !== row2 && col1 !== col2) {
      throw new Error('Cannot place diagonal ship');
    }
    else if(row1 !== row2) {
      const min = Math.min(row1, row2);
      const max = Math.max(row1, row2)
      const ship = Ship(max - min + 1);
      const boardCopy = board.slice();
      for(let n = min; n <= max; n++) {
        if(boardCopy[n][col1].ship) throw new Error('Ship overlaps with another');
        boardCopy[n][col1].ship = ship;
      }
      board = boardCopy;
    }
    else if(col1 !== col2) {
      const min = Math.min(col1, col2);
      const max = Math.max(col1, col2);
      const ship = Ship(max - min + 1);
      const boardCopy = board.slice();
      for(let n = min; n <= max; n++) {
        if(boardCopy[row1][n].ship) throw new Error('Ship overlaps with another');
        boardCopy[row1][n].ship = ship;
      }
      board = boardCopy;
    }
    else {
      // single
    }
    return true;
  };
  const receiveAttack = () => {

  };
  const haveAllSunk = () => {

  };
  const get = () => {

  };
  return {
    place,
    receiveAttack,
    haveAllSunk,
    get
  };
};

export default Gameboard;