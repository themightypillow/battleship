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
  const ships = [];

  const place = (row1, col1, row2, col2) => {
    if(row1 !== row2 && col1 !== col2) throw new Error('Cannot place diagonal ship');
    if(row1 !== row2) {
      const min = Math.min(row1, row2);
      const max = Math.max(row1, row2)
      const ship = Ship(max - min + 1);
      const boardCopy = board.slice(0);
      for(let n = min, i = 0; n <= max; n++, i++) {
        if(boardCopy[n][col1].ship) throw new Error('Ship overlaps with another');
        boardCopy[n][col1].ship = ship;
        boardCopy[n][col1].index = i;
      }
      board = boardCopy;
      ships.push(ship);
    }
    else if(col1 !== col2) {
      const min = Math.min(col1, col2);
      const max = Math.max(col1, col2);
      const ship = Ship(max - min + 1);
      const boardCopy = board.slice(0);
      for(let n = min, i = 0; n <= max; n++, i++) {
        if(boardCopy[row1][n].ship) throw new Error('Ship overlaps with another');
        boardCopy[row1][n].ship = ship;
        boardCopy[row1][n].index = i;
      }
      board = boardCopy;
      ships.push(ship);
    }
    else {
      if(board[row1][col1].ship) throw new Error('Ship overlaps with another');
      const ship = Ship(1);
      board[row1][col1].ship = ship;
      board[row1][col1].index = 0;
      ships.push(ship);
    }
    return true;
  };
  const receiveAttack = (row, column) => {
    if(board[row][column].attacked) throw new Error('Space already attacked');
    board[row][column].attacked = true;
    if(board[row][column].ship) {
      board[row][column].ship.hit(board[row][column].index);
      return true;
    }
    else {
      return false;
    }
  };
  const haveAllSunk = () => {
    return ships.every(ship => ship.isSunk());
  };
  const get = () => {
    return board.slice(0);
  };
  return {
    place,
    receiveAttack,
    haveAllSunk,
    get
  };
};

export default Gameboard;