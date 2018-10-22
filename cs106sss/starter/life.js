// CS 106 SSS: Population Modeling
// CS+SocialGood w/ Students for Sustainable Stanford
// by Cristobal Sciutto
// (Spr. 2018)

// Creates a matrix
function Matrix(w, h) {
  var m = []
  for (var y = 0; y < h; y++) m[y] = [];
  return m;
}

// Class for our Cells
function Cell(y, x, state) {
  this.y = y;
  this.x = x;
  this.state = state;
  this.next = 0;
}

// A Grid of Cells
function CellGrid(w, h) {
  this.h = h;
  this.w = w;
  this.types = 2;
  this.cells = Matrix(w, h);

  // Initializes the grid to dead cells
  this.init = function(random) {
    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        var state = random ?
          Math.floor(Math.random() * this.types) : 0;
        this.cells[y][x] = new Cell(y, x, state);
      }
    }
  }

  // Sets the next matrix to the next state of each cell
  // TODO: fill in the update function
  this.setNext = function(cy, cx, neighbors) {
    var me = this.cells[cy][cx];
    var num = 0;
    // Get number of neighbors
    // If three neighbors, you're born
    // If more than 3 neighbors, you die of overpopulation
    // If less than 2 neighbors, you die of isolation
    // Else, square coninutes the same
  }

  // Gets all the neighboring cells of a given coordinate
  this.getNeighbors = function(cy, cx) {
    var deltas = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]

    var neighbors = [];
    for (var d = 0; d < deltas.length; d++) {

      var x = cx + deltas[d][0];
      if (x < 0 || x >= this.w) continue;

      var y = cy + deltas[d][1];
      if (y < 0 || y >= this.h) continue;

      var neighbor = this.cells[y][x];
      neighbors.push(neighbor);
    }
    return neighbors;
  }

  // Steps forward the automaton
  this.step = function() {
    // First, figure out what the next state should be
    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        var neighbors = this.getNeighbors(y, x);
        this.setNext(y, x, neighbors);
      }
    }
    // Second, update the state of the cells
    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        this.cells[y][x].state = this.cells[y][x].next;
      }
    }
  }
}
