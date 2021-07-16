import Game from "../src/Game";
import { defaultStart } from "./data/default-board";

describe('Game Loop', () => { 
  Game.start([
    { startRow: 4, startColumn: 2, endRow: 8, endColumn: 2},
    { startRow: 1, startColumn: 1, endRow: 1, endColumn: 4},
    { startRow: 4, startColumn: 6, endRow: 4, endColumn: 8},
    { startRow: 7, startColumn: 7, endRow: 9, endColumn: 7},
    { startRow: 6, startColumn: 0, endRow: 7, endColumn: 0}
  ]);
  
  test('game not over in beginning', () => {
    expect(Game.isOver()).toBe(false);
  });
  test('computer attacks one after player attacks', () => {
    expect(Game.attack(1, 0).reduce((row, sum1) => {
      row.reduce((space, sum2) => space.attacked ? ++sum2 : sum2, 0);
      return sum1 + sum2;
    }, 0)).toBe(1);
  });
  test('game not over after one set of attacks', () => {
    expect(Game.isOver()).toBe(false);
  });
  test('two computer attacks have occurred', () => {
    expect(Game.attack(1, 0).reduce((row, sum1) => {
      row.reduce((space, sum2) => space.attacked ? ++sum2 : sum2, 0);
      return sum1 + sum2;
    }, 0)).toBe(2);
  });
  test('game reaches an end', () => {
    for(let r = 0; r < 10; r++) {
      for(let c = 0; c < 10; c++) {
        if(Game.isOver()) break;
        if((r === 0 && c === 0) || (r === 1 && c === 0)) continue;
        Game.attack(r, c);
      }
    }
    expect(Game.isOver()).toBe(true);
  });
});