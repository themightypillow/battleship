import Game from './Game';

const UI = (() => {

  document.querySelectorAll('.board').forEach((board, index) => {
    for(let r = 0; r < 10; r++) {
      const row = document.createElement('div');
      row.textContent = r + 1;
      row.classList.add('board-label');
      board.appendChild(row);
      for(let c = 0; c < 10; c++) {
        const square = document.createElement('div');
        square.classList.add(index === 0 ? 'user' : 'computer');
        square.classList.add('space');
        square.dataset.row = r;
        square.dataset.column = c;
        square.style.gridArea = `${r + 2} / ${c + 2}`
        board.appendChild(square);
      }
    }
  });

  // default ship configuration
  const battleship = document.querySelector('.battleship').cloneNode(true);
  battleship.style.gridArea = '2 / 2 / span 1 / span 4';
  document.querySelector('#user-section .board').appendChild(battleship);
  const destroyer = document.querySelector('.destroyer').cloneNode(true);
  destroyer.style.gridArea = '4 / 4 / span 1 / span 3';
  document.querySelector('#user-section .board').appendChild(destroyer);
  const cruiser = document.querySelector('.cruiser').cloneNode(true);
  cruiser.style.gridArea = '6 / 7 / span 1 / span 2';
  document.querySelector('#user-section .board').appendChild(cruiser);
  const carrier = document.querySelector('.carrier').cloneNode(true);
  carrier.style.gridArea = '8 / 4 / span 1 / span 5';
  document.querySelector('#user-section .board').appendChild(carrier);
  const submarine = document.querySelector('.submarine').cloneNode(true);
  submarine.style.gridArea = '10 / 7 / span 1 / span 3';
  document.querySelector('#user-section .board').appendChild(submarine);

  const userShips = [
    { startRow: 6, startColumn: 2, endRow: 6, endColumn: 6 },
    { startRow: 0, startColumn: 0, endRow: 0, endColumn: 3 },
    { startRow: 2, startColumn: 2, endRow: 2, endColumn: 4 },
    { startRow: 8, startColumn: 5, endRow: 8, endColumn: 7 },
    { startRow: 4, startColumn: 5, endRow: 4, endColumn: 6 }
  ];

  const dot = document.querySelector('.dot').cloneNode();
  dot.classList.replace('dark-grey', 'darker-grey');
  const redDot = dot.cloneNode();
  redDot.classList.replace('darker-grey', 'red');
  const blueDot = dot.cloneNode();
  blueDot.classList.replace('darker-grey', 'blue');

  const cpuSection = document.querySelector('#computer-section');
  const info = document.querySelector('#info');

  function userTurn(space) {
    cpuSection.style.pointerEvents = 'none';
    const result = Game.makeUserTurn(space.dataset.row, space.dataset.column);
    space.appendChild(result.hit ? redDot.cloneNode() : dot.cloneNode());
    info.classList.replace('darker-grey', result.hit ? 'red' : 'slate');
    info.textContent = `Your attack is a ${result.hit ? 'hit' : 'miss'}!`;
    return result.hit;
  }

  const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));

  async function cpuTurn(isHit) {
    await sleep(2000);
    info.classList.replace(isHit ? 'red' : 'slate', 'darker-grey');
    info.textContent = 'Opponent is Attacking';
    const result = Game.makeCPUTurn();
    const space = document.querySelector(`.user.space[data-row='${result.row}'][data-column='${result.column}']`);
    await sleep(2000);
    space.appendChild(result.hit ? redDot.cloneNode() : blueDot.cloneNode());
    info.classList.replace('darker-grey', result.hit ? 'red' : 'slate');
    info.textContent = `Opponent's attack is a ${result.hit ? 'hit' : 'miss'}!`;
    await sleep(2000);
    info.classList.replace(result.hit ? 'red' : 'slate', 'darker-grey');
    info.textContent = 'Attack Your Opponent';
    cpuSection.style.pointerEvents = 'auto';
  }
  
  info.addEventListener('click', (e) => {
    Game.placeShips(userShips);
    e.target.classList.remove('green');
    e.target.classList.add('darker-grey');
    e.target.textContent = 'Attack Your Opponent';
    cpuSection.style.pointerEvents = 'auto';
  });

  document.querySelectorAll('.computer.space').forEach(space => {
    space.addEventListener('click', (e) => {
      const isHit = userTurn(e.target);
      cpuTurn(isHit);
    });
  });

})();

export default UI;