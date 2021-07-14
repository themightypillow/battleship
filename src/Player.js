const Player = (board, rows, columns, isHuman) => {
  const plays = [];

  const play = (row, column) => {
    if(isHuman) {
      if(row >= rows || column >= columns) throw new Error('Space out of bounds');
      board.receiveAttack(row, column);
      return {
        row,
        column
      };
    }
    else {

    }
  };
  return {
    play
  };
};

export default Player;