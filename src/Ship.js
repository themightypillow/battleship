const Ship = (length) => {
  const hitSpots = [];
  const hit = (n) => {
    hitSpots.push(n);
  };
  const isSunk = () => {
    return hitSpots.length === length;
  };
  return {
    hit,
    isSunk
  };
};

export default Ship;