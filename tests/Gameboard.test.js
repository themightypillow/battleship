import Gameboard from "../src/Gameboard";

describe('Gameboard', () => {
  test('create gameboard', () => {
    expect(Object.keys(Gameboard())).toEqual([
      'place',
      'receiveAttack',
      'haveAllSunk',
      'get'
    ]);
  });
  xtest('place one ship on board and miss', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    expect(board.receiveAttack(0, 1)).toBeFalsy();
  });
  xtest('place one ship on board and hit', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    expect(board.receiveAttack(1, 0)).toBeTruthy();
  });
  xtest('all ships have not been sunk', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    expect(board.haveAllSunk()).toBeFalsy();
  });
  xtest('all ships have been sunk', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.haveAllSunk()).toBeTruthy();
  });
  xtest('empty board is represented', () => {
    const board = Gameboard(2, 2);
    expect(board.get()).toEqual([
      [{ attacked: false, ship: null }, { attacked: false, ship: null }],
      [{ attacked: false, ship: null }, { attacked: false, ship: null }]
    ]);
  });
  xtest('board with ship is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).toBeNull();
    expect(boardArray[1][0].ship).toBeNull();
  });
  xtest('board with missed attack is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 1);
    expect(board.get()[0][1].attacked).toBeTruthy();
  });
  xtest('board with hit attack is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    expect(board.get()[0][0].attacked).toBeTruthy();
  });
});