import Game from '../src/Game';
import { defaultShips } from './data/default-board';

describe('Game Loop', () => { 
  test('game should start with no errors', () => {
    expect(() => Game.start(defaultShips)).not.toThrow();
  });  
  xtest('game not over in beginning', () => {
    expect(Game.isOver()).toBe(false);
  });
  xtest('computer attacks one after player attacks', () => {
    expect(Game.attack(1, 0).reduce((row, sum1) => {
      row.reduce((space, sum2) => space.attacked ? ++sum2 : sum2, 0);
      return sum1 + sum2;
    }, 0)).toBe(1);
  });
  xtest('game not over after one set of attacks', () => {
    expect(Game.isOver()).toBe(false);
  });
  xtest('two computer attacks have occurred', () => {
    expect(Game.attack(1, 0).reduce((row, sum1) => {
      row.reduce((space, sum2) => space.attacked ? ++sum2 : sum2, 0);
      return sum1 + sum2;
    }, 0)).toBe(2);
  });
  xtest('game reaches an end', () => {
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