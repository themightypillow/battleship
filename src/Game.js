import Gameboard from './Gameboard';
import Player from './Player';
import { defaultShips } from '../tests/data/default-board';

const Game = (() => {
  const userBoard = Gameboard(10, 10);
  const cpuBoard = Gameboard(10, 10);
  const user = Player(cpuBoard, 10, true);
  const cpu = Player(userBoard, 10, false);

  const placeShips = (userShips) => {
    userShips.forEach(location => userBoard.place(
      location.startRow, location.startColumn, location.endRow, location.endColumn
    ));
    defaultShips.forEach(location => cpuBoard.place(
      location.startRow, location.startColumn, location.endRow, location.endColumn
    ));
  };

  const makeUserTurn = (row, column) => {
    return {
      hit: user.play(row, column).hit,
      win: cpuBoard.haveAllSunk()
    };
  };

  const makeCPUTurn = () => {
    return {
      ...cpu.play(),
      win: userBoard.haveAllSunk(),
    };
  };

  return {
    placeShips,
    makeUserTurn,
    makeCPUTurn
  };
})();

export default Game;