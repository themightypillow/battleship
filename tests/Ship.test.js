import Ship from "../src/Ship";

describe('Ship', () => {
  test('create ship', () => {
    expect(Object.keys(Ship())).toEqual([
      "hit",
      "isSunk"
    ]);
  });
});