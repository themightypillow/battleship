import Player from "../src/Player";
import Gameboard from "../src/Gameboard";

describe('Player', () => {
  test('create Player', () => {
    const board = Gameboard(2, 2);
    expect(Object.keys(Player(board, 2, 2, false))).toEqual([
      'play'
    ]);
  });

  describe('human player', () => {
    const board = Gameboard(2, 2);
    const human = Player(board, 2, 2, true);

    test('make legal move', () => {      
      expect(human.play(0, 0)).toEqual({
        row: 0,
        column: 0
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

    test('make random legal move', () => {
      const computer = Player(board, 2, 2, false);
      const {row, column} = computer.play();
      expect(row > 0 && row < 2).toBeTruthy();
      expect(column > 0 && column < 2).toBeTruthy();
    });
    test('cannot make play after all spaces attacked', () => {
      computer.play();
      computer.play();
      computer.play();
      expect(() => computer.play()).toThrow('All spaces attacked');
    });
  });  
});