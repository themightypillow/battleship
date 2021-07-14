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
  test('place a ship', () => {
    const board = Gameboard(2, 2);
    expect(board.place(0, 0, 1, 0)).toBe(true);
  });
  test('cannot place diagonal ship', () => {
    const board = Gameboard(2, 2);
    expect(() => board.place(0, 0, 1, 1)).toThrow('Cannot place diagonal ship');
  });
  test('cannot place overlapping ships', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    expect(() => board.place(0, 0, 0, 1)).toThrow('Ship overlaps with another');
  });
  xtest('make a miss', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    expect(board.receiveAttack(0, 1)).toBe(false);
  });
  xtest('make a hit', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    expect(board.receiveAttack(1, 0)).toBe(true);
  });
  xtest('all ships have not been sunk', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    expect(board.haveAllSunk()).toBe(false);
  });
  xtest('all ships have been sunk', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.haveAllSunk()).toBe(true);
  });
  xtest('empty board is represented', () => {
    const board = Gameboard(2, 2);
    expect(board.get()).toEqual([
      [{ attacked: false, ship: null }, { attacked: false, ship: null }],
      [{ attacked: false, ship: null }, { attacked: false, ship: null }]
    ]);
  });
  xtest('board with vertical ship is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).toBeNull();
    expect(boardArray[1][0].ship).toBeNull();
  });
  xtest('board with vertical ship with no order is represented', () => {
    const board = Gameboard(2, 2);
    board.place(1, 0, 0, 0);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).toBeNull();
    expect(boardArray[1][0].ship).toBeNull();
  });
  xtest('board with horizontal ship is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 0, 1);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).toBeNull();
    expect(boardArray[0][1].ship).toBeNull();
  });
  xtest('board with horizontal ship with no order is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 1, 0, 0);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).toBeNull();
    expect(boardArray[0][1].ship).toBeNull();
  });
  xtest('board with missed attack is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 1);
    expect(board.get()[0][1].attacked).toBe(true);
  });
  xtest('board with hit attack is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    expect(board.get()[0][0].attacked).toBe(true);
  });
});