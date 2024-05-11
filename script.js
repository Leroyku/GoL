const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 400;
canvas.height = 400;

let COLS = canvas.width / resolution;
let ROWS = canvas.height / resolution;

let isPlaying = false;
let grid = buildGrid();

function buildGrid() {
  return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(null).map(() => 0));
}

canvas.addEventListener('mousedown', (e) => {
  const x = Math.floor(e.offsetX / resolution);
  const y = Math.floor(e.offsetY / resolution);
  grid[x][y] = 1;
  render(grid);
});

function startGame() {
  if (!isGridEmpty(grid)) {
    isPlaying = true;
    requestAnimationFrame(update);
  } else {
    alert('Поле пустое. Добавьте живые клетки, прежде чем начать игру.');
  }
}

function isGridEmpty(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      if (grid[col][row] === 1) {
        return false;
      }
    }
  }
  return true;
}

function stopGame() {
  isPlaying = false;
}

function clearGrid() {
  isPlaying = false;
  grid = buildGrid();
  render(grid);
}

function changeSize() {
  isPlaying = false;
  const newSize = prompt('Введите новый размер поля', `${COLS}`);
  canvas.width = canvas.height = newSize * resolution;
  COLS = canvas.width / resolution;
  ROWS = canvas.height / resolution;
  grid = buildGrid();
  render(grid);
}

function randomFill() {
  isPlaying = false;
  grid = buildGrid().map((row) => row.map(() => (Math.random() > 0.5 ? 1 : 0)));
  render(grid);
}

function update() {
  if (!isPlaying) return;
  grid = nextGen(grid);
  render(grid);
  requestAnimationFrame(update);
}

const MIN_NEIGHBORS_FOR_LIVE = 2;
const MAX_NEIGHBORS_FOR_LIVE = 3;
const NEIGHBOR_OFFSETS = [-1, 0, 1];

function countNeighbors(grid, col, row) {
  let count = 0;
  NEIGHBOR_OFFSETS.forEach((offsetX) => {
    NEIGHBOR_OFFSETS.forEach((offsetY) => {
      if (offsetX === 0 && offsetY === 0) return;
      const neighborCol = col + offsetX;
      const neighborRow = row + offsetY;
      if (neighborCol >= 0 && neighborCol < COLS && neighborRow >= 0 && neighborRow < ROWS) {
        count += grid[neighborCol][neighborRow];
      }
    });
  });
  return count;
}

function applyRules(cell, numNeighbors) {
  if (
    cell === 1 &&
    (numNeighbors < MIN_NEIGHBORS_FOR_LIVE || numNeighbors > MAX_NEIGHBORS_FOR_LIVE)
  ) {
    return 0;
  } else if (cell === 0 && numNeighbors === MAX_NEIGHBORS_FOR_LIVE) {
    return 1;
  }
  return cell;
}

function nextGen(grid) {
  const nextGen = grid.map((arr) => [...arr]);
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      const numNeighbors = countNeighbors(grid, col, row);
      nextGen[col][row] = applyRules(cell, numNeighbors);
    }
  }
  return nextGen;
}

function render(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      ctx.beginPath();
      const centerX = (col + 0.5) * resolution;
      const centerY = (row + 0.5) * resolution;
      const radius = resolution / 2;
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
    }
  }
}
