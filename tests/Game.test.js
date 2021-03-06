import Game from '../src/Game';
import { defaultShips, defaultCoordinates } from './data/default-board';

describe('Game Loop', () => { 
  Game.placeShips(defaultShips);

  test('user makes a turn, miss', () => {
    expect(Game.makeUserTurn(0, 0)).toEqual({
      hit: false,
      win: false
    });    
  });
  test('cpu makes a turn', () => {
    const move = Game.makeCPUTurn();
    expect(move.hit).toBeDefined();
    expect(move.row).toBeDefined();
    expect(move.column).toBeDefined();
    expect(move.win).toBe(false);
  });
  test('user makes a turn, hit', () => {
    let first = defaultCoordinates.shift();
    expect(Game.makeUserTurn(first.row, first.column)).toEqual({
      hit: true,
      win: false
    });
  });
  test('game ends after user hits all ships', () => {
    const last = defaultCoordinates.pop();
    defaultCoordinates.forEach(coords => Game.makeUserTurn(coords.row, coords.column));
    expect(Game.makeUserTurn(last.row, last.column)).toEqual({
      hit: true,
      win: true
    });
  });
});