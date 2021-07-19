import Game from '../src/Game';
import { defaultShips, defaultCoordinates } from './data/default-board';

describe('Game Loop', () => { 
  Game.placeShips(defaultShips);

  test('user makes a turn, miss', () => {
    expect(Game.makeUserTurn({ row: 0, column: 0 })).toEqual({
      hit: false,
      win: false
    });    
  });
  test('cpu makes a turn', () => {
    const move = Game.makeCPUTurn();
    expect(move.win).toBe(false);
    expect(move.hit).toBeDefined();
    expect(move.row).toBeDefined();
    expect(move.column).toBeDefined();
  });
  test('user makes a turn, hit', () => {
    expect(Game.makeUserTurn(defaultCoordinates.shift())).toEqual({
      hit: true,
      win: false
    });
  });
  test('game ends after user hits all ships', () => {
    const last = defaultCoordinates.pop();
    defaultCoordinates.forEach(coords => Game.makeUserTurn(coords));
    expect(Game.makeUserTurn(last)).toEqual({
      hit: true,
      win: true
    });
  });
});