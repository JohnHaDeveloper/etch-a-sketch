const container = document.querySelector('.container');
const grid = document.querySelector('.grid');
const resetBtn = document.querySelector('#reset-btn');
const eraseBtn = document.querySelector('#erase-btn');
const sizeInput = document.querySelector('#size-input');
const colorInput = document.querySelector('#color-input');

let cellSize = 20;
let gridSize = 16;
let isDrawing = false;

function createGrid(size) {
  // Set the grid size (up to a maximum of 64)
  gridSize = Math.min(size, 64);
  
  // Remove any existing cells
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  
  // Set the grid size (up to a maximum of 64)
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  
  // Create new cells
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    grid.appendChild(cell);
  }
  
  addEventListeners();
}

function resetGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.backgroundColor = 'white';
  });
  isDrawing = false;
}

function eraseGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.backgroundColor = 'white';
  });
  isDrawing = false;
}

function darkenColor(color) {
  let red = parseInt(color.substring(4, color.indexOf(',')));
  let green = parseInt(color.substring(color.indexOf(',') + 1, color.lastIndexOf(',')));
  let blue = parseInt(color.substring(color.lastIndexOf(',') + 1, color.indexOf(')')));
  red -= 26;
  green -= 26;
  blue -= 26;
  return `rgb(${red}, ${green}, ${blue})`;
}

function addEventListeners() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (cell.style.backgroundColor !== 'white') {
        let currentColor = cell.style.backgroundColor;
        cell.style.backgroundColor = darkenColor(currentColor);
      } else {
        cell.style.backgroundColor = colorInput.value;
      }
    });

    cell.addEventListener('mouseover', () => {
      if (isDrawing) {
        if (cell.style.backgroundColor !== 'white') {
          let currentColor = cell.style.backgroundColor;
          cell.style.backgroundColor = darkenColor(currentColor);
        } else {
          cell.style.backgroundColor = colorInput.value;
        }
      }
    });
  });
}

// Create initial grid
createGrid(gridSize);

// Add event listeners to controls
resetBtn.addEventListener('click', resetGrid);
eraseBtn.addEventListener('click', eraseGrid);
sizeInput.addEventListener('input', () => {
  createGrid(sizeInput.value);
});
colorInput.addEventListener('input', () => {
  if (colorInput.value !== '#ffffff') {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      if (cell.style.backgroundColor === '#ffffff') {
        cell.style.backgroundColor = colorInput.value;
      }
    });
  }
});

// Add mouse event listeners for drawing
grid.addEventListener('mousedown', () => {
  isDrawing = true;
});

grid.addEventListener('mouseup', () => {
  isDrawing = false;
});

grid.addEventListener('mouseleave', () => {
  isDrawing = false;
});
