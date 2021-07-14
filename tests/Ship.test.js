import Ship from "../src/Ship";

describe('Ship', () => {
  test('create ship', () => {
    expect(Object.keys(Ship())).toEqual([
      "hit",
      "isSunk"
    ]);
  });
  test('ship is hit', () => {
    const ship = Ship(2);
    expect(ship.hit(0)).toBe(true);
  });
  test('cannot hit ship twice in same spot', () => {
    const ship = Ship(2);
    ship.hit(0);
    expect(() => ship.hit(0)).toThrow('Ship already hit here');
  });
  test('ship is not sunk after one hit', () => {
    const ship = Ship(2);
    ship.hit(0);
    expect(ship.isSunk()).toBeFalsy();
  });
  test('ship is not sunk after two hits', () => {
    const ship = Ship(3);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test('ship is sunk', () => {
    const ship = Ship(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBeTruthy();
  });
});