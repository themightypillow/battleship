const Ship = (length) => {
  const spots = Array.from(Array(length), () => false);
  const hit = (i) => {
    if(spots[i]) throw new Error('Ship already hit here');
    spots[i] = true;
    return true;
  };
  const isSunk = () => {
    return spots.every(spot => spot === true);
  };
  return {
    hit,
    isSunk
  };
};

export default Ship;