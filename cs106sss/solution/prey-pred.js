function Matrix(w, h) {
  var m = []
  for (var y = 0; y < h; y++) m[y] = [];
  return m;
}

function Cell(y, x, state) {
  this.y = y;
  this.x = x;
  this.state = state;
  this.next = 0;
}

function CellGrid(w, h) {
  this.h = h;
  this.w = w;
  // TODO: Change number of species
  // Options: Empty, Prey, Pred
  this.types = 3;
  this.cells = Matrix(w, h);

  // TODO: Set constant values
  this.preyBirthRate = 0.5;
  this.preyDeathRate = 0.5;
  this.predBirthRate = 0.5;
  this.predDeathRate = 0.5;

  this.init = function(random) {
    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        // TODO: set up so with probability
        // 60% square is a prey
        // 16% square is a pred
        // 24% square is empty
        var state = random ?
          (Math.random() < 0.6 ? 1 :
            (Math.random() < 0.6 ? 0 : 2))
          : 0;
        this.cells[y][x] = new Cell(y, x, state);
      }
    }
  }

  this.setNext = function(cy, cx, neighbors) {
    var me = this.cells[cy][cx];
    var numPrey = 0;
    var numPred = 0;
    // TODO: Get number of neighbors
    // HINT: Loop through the neighbors like the game of life
    for (var i = 0; i < neighbors.length; i++) {
      if (neighbors[i].state == 1) numPrey++;
      if (neighbors[i].state == 2) numPred++;
    }
    // Case 1: Prey
    if (me.state == 1) {
      if (Math.random() < Math.pow((1 - this.preyDeathRate), numPred)) {
        // Attempt to hunt prey and fail
        me.next = 1;
      } else if (Math.random() < this.predBirthRate) {
        // Predators attempt to breed
        me.next = 2;
      } else {
        me.next = 0;
      }
    // Case 2: Predator
    } else if (me.state == 2) {
      // TODO: if it's a predator, check if he'll die
      if (Math.random() < this.predDeathRate) {
        // Predator dies
        me.next = 0;
      } else {
        // Predator stays alive
        me.next = 2;
      }
    // Case 3: Empty
    } else {
      // TODO: if it's a empty, and there are only prey, try to breed
      if (numPrey == 0 || numPred > 0) {
        // No Prey or some Predators
        me.next = 0;
      } else if (Math.random() < Math.pow((1 - this.preyBirthRate), numPrey)) {
        // Prey try to breed
        me.next = 1;
      } else {
        me.next = 0;
      }
    }
  }

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

  this.step = function() {
    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        var neighbors = this.getNeighbors(y, x);
        this.setNext(y, x, neighbors);
      }
    }

    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        this.cells[y][x].state = this.cells[y][x].next;
      }
    }
  }
}
