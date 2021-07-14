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
  test('make a miss', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    expect(board.receiveAttack(0, 1)).toBe(false);
  });
  test('make a hit', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    expect(board.receiveAttack(1, 0)).toBe(true);
  });
  test('all ships have not been sunk', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    expect(board.haveAllSunk()).toBe(false);
  });
  test('all ships have been sunk', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.haveAllSunk()).toBe(true);
  });
  test('empty board is represented', () => {
    const board = Gameboard(2, 2);
    expect(board.get()).toEqual([
      [{ attacked: false, ship: null }, { attacked: false, ship: null }],
      [{ attacked: false, ship: null }, { attacked: false, ship: null }]
    ]);
  });
  test('board with vertical ship is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).not.toBeNull();
    expect(boardArray[1][0].ship).not.toBeNull();
  });
  test('board with vertical ship with no order is represented', () => {
    const board = Gameboard(2, 2);
    board.place(1, 0, 0, 0);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).not.toBeNull();
    expect(boardArray[1][0].ship).not.toBeNull();
  });
  test('board with horizontal ship is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 0, 1);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).not.toBeNull();
    expect(boardArray[0][1].ship).not.toBeNull();
  });
  test('board with horizontal ship with no order is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 1, 0, 0);
    const boardArray = board.get();
    expect(boardArray[0][0].ship).not.toBeNull();
    expect(boardArray[0][1].ship).not.toBeNull();
  });
  test('board with missed attack is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 1);
    expect(board.get()[0][1].attacked).toBe(true);
  });
  test('board with hit attack is represented', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    expect(board.get()[0][0].attacked).toBe(true);
  });
  test('cannot attack the same spot twice', () => {
    const board = Gameboard(2, 2);
    board.place(0, 0, 1, 0);
    board.receiveAttack(0, 0);
    expect(() => board.receiveAttack(0, 0)).toThrow('Space already attacked');
  });
});