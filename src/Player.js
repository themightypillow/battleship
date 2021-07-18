const Player = (board, size, isHuman) => {
    
  const generateMoves = () => {
    const spaces = [];
    for(let r = 0; r < size; r++) {
      for(let c = 0; c < size; c++) {
        spaces.splice(Math.floor(Math.random() * spaces.length), 0, { row: r, column: c });
      }
    }
    return spaces;
  };

  const moves = isHuman ? [] : generateMoves();

  const setAdjacents = (row, column) => {
    const list = [];
    for(let r = row - 1; r < row + 2; r++) {
      if(r < 0 || r >= size) continue;
      for(let c = column - 1; c < column + 2; c++) {
        if(c < 0 || c >= size || (r === row && c === column)) continue;
        list.push({ row: r, column: c});
      }
    }
    return list;
  };

  const play = (row, column) => {
    if(isHuman) {
      if(row >= size || column >= size) throw new Error('Space out of bounds');
      const hit = board.receiveAttack(row, column);
      return {
        row,
        column,
        hit
      };
    }
    else {
      const move = moves.shift();
      if(!move) throw new Error('All spaces attacked');
      let success = false;
      while(!success) {
        try {
          const isHit = board.receiveAttack(move.row, move.column);
          success = true;
          move.hit = isHit;
          if(isHit) moves.unshift(...setAdjacents(move.row, move.column));
        }
        catch(e) {
          move = moves.shift();
          if(!move) throw new Error('All spaces attacked');
        }
      }
      return move;
    }
  };
  
  return {
    play
  };
};

export default Player;