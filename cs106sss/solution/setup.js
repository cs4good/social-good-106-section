// CS 106 SSS: Population Modeling
// CS+SocialGood w/ Students for Sustainable Stanford
// by Cristobal Sciutto
// (Spr. 2018)

// You are not responsible for understanding how this works!
// Regardless, feel free to look around
// Some cool sections are commented

/////////////////////////////////////
// Play around with setting here ////
const WIDTH  = 50;               ////
const HEIGHT = 50;               ////
const DELAY  = 400;              ////
const RANDOM = true;             ////
//////////////////////////////////////

(function() {
  // Boolean to continously animate
  var animate = true;
  // These are the colors for states 0, 1, 2, etc
  var colors = ["#fff", "#57AD68", "#ED2939"];

  // How many cells high the field is.
  var fieldHeight = HEIGHT;
  var pxHeight = 800;
  var pxHeightSquare = pxHeight / fieldHeight;

  // How many cells wide the field is.
  var fieldWidth = WIDTH;
  var pxWidth = 800;
  var pxWidthSquare = pxWidth / fieldWidth;

  var grid = new CellGrid(fieldWidth, fieldHeight);
  grid.init(RANDOM);

  var svg = d3.select('#field')
    .append("svg:svg")
    .attr('height', pxHeight)
    .attr('width', pxWidth);

  var row = svg.selectAll(".row")
    .data(grid.cells)
    .enter().append("g")
    .attr("class", "row");

  var column = row.selectAll(".square")
    .data((d) => d)
    .enter().append("rect")
    .attr("class", "square")
    .attr('x', function(d) { return d.x * pxWidthSquare; })
    .attr('y', function(d) { return d.y * pxHeightSquare; })
    .attr('width', pxWidthSquare)
    .attr('height', pxHeightSquare)
    .style("fill", function(d) { return colors[d.state] })
    .style("stroke", "#777")
    .on('click', function(d) {
      // This is where we increment the state of the cell when clicking
      console.log(d);
      d.state = (d.state + 1) % grid.types;
      d3.select(this)
        .style("fill", function(d) { return colors[d.state] })
    });

  function display() {
    grid.step();
    var row = svg.selectAll(".row")
      .data(grid.cells);
    var column = row.selectAll(".square")
      .data((d) => d)
      .style("fill", function(d) { return colors[d.state] })
    
    if (animate) setTimeout(arguments.callee, DELAY);
    else return;
  }

  window.onload = function() {
    document.getElementById("start").onclick = function() {
      animate = true;
      display();
    }
    document.getElementById("step").onclick = function() {
      animate = false;
      display();
    }
    document.getElementById("stop").onclick = function() {
      animate = false;
    }
  }
})();

