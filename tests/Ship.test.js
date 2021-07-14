import Ship from "../src/Ship";

describe('Ship', () => {
  test('create ship', () => {
    expect(Object.keys(Ship())).toEqual([
      "hit",
      "isSunk"
    ]);
  });
  test('ship hit once and up', () => {
    const ship = Ship(2);
    ship.hit(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test('ship hit twice and up', () => {
    const ship = Ship(3);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test('ship hit twice and sunk', () => {
    const ship = Ship(2);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBeTruthy();
  });
});