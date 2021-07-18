import Player from '../src/Player';
import Gameboard from '../src/Gameboard';

describe('Player', () => {
  test('create Player', () => {
    const board = Gameboard(2, 2);
    expect(Object.keys(Player(board, 2, false))).toEqual([
      'play'
    ]);
  });

  describe('human player', () => {
    const board = Gameboard(2, 2);
    const human = Player(board, 2, true);

    test('make legal move', () => {      
      expect(human.play(0, 0)).toEqual({
        row: 0,
        column: 0,
        hit: false
      });
    });
    test('make a hit', () => {
      board.place(1, 1, 1, 1);
      expect(human.play(1, 1)).toEqual({
        row: 1,
        column: 1,
        hit: true
      });
    });
    test('make illegal move', () => {
      expect(() => human.play(2, 2)).toThrow('Space out of bounds');
    });
    test('hit same space twice', () => {
      expect(() => human.play(0, 0)).toThrow('Space already attacked');
    });
  });

  describe('computer player', () => {
    const board = Gameboard(2, 2);
    const computer = Player(board, 2, false);

    test('make a legal move', () => {
      const {row, column} = computer.play();
      expect(row >= 0 && row < 2).toBeTruthy();
      expect(column >= 0 && column < 2).toBeTruthy();
    });
    test('cannot make play after all spaces attacked', () => {
      computer.play();
      computer.play();
      computer.play();
      expect(() => computer.play()).toThrow('All spaces attacked');
    });
  });  
});