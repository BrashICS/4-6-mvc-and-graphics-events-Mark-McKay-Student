/**
 * ICS4U - Mr. Brash 🐿️
 * 4.6 - MVC and Graphics... a trial run for a game!
 *
 * Read through the README carefully!
 *
 * Author: Mark McKay
 */

"use strict";

// Globals, event listeners, and general tomfoolery
// Feel free to change values but beware the consequences
const CVS_WIDTH = 600;
const CVS_HEIGHT = 600;
const ROWS = 8;
const COLS = 8;
let cvs;
let grid = [];
let lastX = 0;
let lastY = 0;

// The (overly simple) model
class Square {
  colour = [0, 0, 0];
  #real_colour = [0, 0, 0];
  value = 0;

  constructor(colour, value) {
    this.colour = colour;
    this.#real_colour = colour;
    this.value = value;
  }

  deselect() {
    this.colour = this.#real_colour;
  }
}

// Setup the scene (runs first)
function setup() {
  cvs = createCanvas(CVS_WIDTH, CVS_HEIGHT);

  // Initialize the grid to all white squares
  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      (y + x) % 2 == 0 ? grid[y].push(new Square([227, 177, 221], 0)) : grid[y].push(new Square([135, 74, 128], 0));
    }
  }
}

// Draw a new frame of the scene
function draw() {
  // Clear the screen with a grey rectangle
  background(220);

  // Draw the grid
  draw_grid(COLS, ROWS);
}

/* Draw a grid that is x by y
 * Utilize the `grid` 2D array of Squares
 * Fill each square with the proper .colour and if the value
 * of the square is over 0, write the value on the square.
 */
function draw_grid(x, y) {
  // Get the size of each square
  let width = Math.floor(CVS_WIDTH / x);
  let height = Math.floor(CVS_HEIGHT / y);

  // Center the grid on the canvas if there's a rounding error
  let x_buffer = (CVS_WIDTH - width * x) / 2;
  let y_buffer = (CVS_HEIGHT - height * y) / 2;

  stroke("black");
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      // Fill the square with the r,g,b values from the model
      fill(...grid[row][col].colour);
      rect(col * width + x_buffer, row * height + y_buffer, width, height);

      // Write the value of the square in the center of it
      if (grid[row][col].value > 0) {
        textAlign(CENTER, CENTER);
        fill("black");
        text(grid[row][col].value, col * width + x_buffer + width / 2, row * height + y_buffer + width / 2);
      }
    }
  }
}

/*
 *
 */
function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseY > CVS_HEIGHT || mouseX > CVS_WIDTH) return -1;
  const y = Math.floor(mouseY / (CVS_HEIGHT / COLS));
  const x = Math.floor(mouseX / (CVS_WIDTH / ROWS));
  grid[lastY][lastX].deselect();
  if (mouseButton === RIGHT) grid[y][x].value = 0;
  else grid[y][x].value++;
  grid[y][x].colour = [128, 128, 0];
  lastY = y;
  lastX = x;
}

function keyPressed() {
  if (key == "Escape") grid[lastY][lastX].deselect();
}
