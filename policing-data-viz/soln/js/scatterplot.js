
var formatPercent = d3.format("%");

// add method to d3 for moving nodes to front
d3.selection.prototype.moveToFront = function() {  
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

// variable to store all scatterplot data
var spData;

// variable to store states available for each rate_type
var rateTypeStates = {};

// open data file
d3.csv("data/summary-stats.txt", function(error, data) {
  // nest flattened data by distinct state, then location, then driver race
  spData = d3.nest()
    .key(function(d) { return d.state; })
    .key(function(d) { return d.location; })
    .key(function(d) { return d.driver_race; })
    .map(data, d3.map);

  // set a new key on each location (in each state) for storing total stops
  spData.forEach( function(state) {
    state_obj = spData.get(state);
    state_obj.forEach( function(loc) {
      loc_obj = state_obj.get(loc)
      // add up stops among all driver races for the location
      total = 0
      loc_obj.forEach( function(key, values) {
        total+= +values[0].stops_per_year;
      })
      loc_obj.set('total_stops_per_year', total)
    })
  });
  console.log(spData);
  // draw charts AFTER data is loaded 
  drawChart('search_rate', 10);

  drawChart('arrest_rate', 10);
  fillStateSelector('outcome')
});


function drawChart(rate_type, max_rate) {
  var div_id = "#" + rate_type + "_chart"

  // set the height div containing chart to be equal to its width
  $(div_id).height($(div_id).width())
  
  var margin = {top: 20, right: 40, bottom: 55, left: 40},
      width = $(div_id).width() - margin.left - margin.right,
      height = $(div_id).height() - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .innerTickSize(-height)
      .outerTickSize(0)
      .tickPadding(10)
      .ticks(6);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(10)
      .ticks(6);

  var svg = d3.select(div_id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain([0.0, max_rate]).nice();
  y.domain([0.0, max_rate]).nice();

  var axis_labels = {
    'search_rate': ' searches per 100 stops',
    'arrest_rate': ' arrests per 100 stops',
  };

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("White" + axis_labels[rate_type]);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Minority" + axis_labels[rate_type]);

  // add diagonal line
  svg.append("line")
      .attr("x1", x.range()[0])
      .attr("y1", y.range()[0])
      .attr("x2", x.range()[1])
      .attr("y2", y.range()[1])
      .attr("class", "guide-line");
  
  // add a hidden tooltip div
  d3.select("body")
    .append('div')
      .attr('id', rate_type + '_tooltip')
      .attr('class', 'sp-tooltip')
      .style('display', 'none');

  drawDots("Black", rate_type, svg, x, y, max_rate);
  drawDots("Hispanic", rate_type, svg, x, y, max_rate);
};


function drawDots(race, rate_type, svg, x, y, max_rate) {

  var dotData = [];
  
  spData.forEach( function(state) {
    state_obj = spData.get(state);
    state_obj.forEach( function(loc) {
      loc_obj = state_obj.get(loc)
      white_rate = +loc_obj.get("White")[0][rate_type] * 100
      minority_rate = +loc_obj.get(race)[0][rate_type] * 100
      // skip if the white rate is too high
      if (0 < white_rate && white_rate < max_rate && 
          0 < minority_rate && minority_rate < max_rate) { 
        dotData.push(
          {
            'location': loc,
            'state': state,
            'total_stops_per_year': loc_obj.get('total_stops_per_year'),
            'minority_stops_per_year': +loc_obj.get(race)[0].stops_per_year,
            'white_rate': white_rate,
            'minority_rate': minority_rate,
            'minority_race': race
          }
        )}
    })
  });

  // manage states list
  if (!rateTypeStates[rate_type]) {rateTypeStates[rate_type] = []};

  dotData.forEach( function(d) {
    if (rateTypeStates[rate_type].indexOf(d.state) == -1) {
      rateTypeStates[rate_type].push(d.state)};
  })

  var dots = svg.selectAll('.dot').filter('.' + race)
    .data(dotData)

  tooltip = d3.select('#' + rate_type + '_tooltip')

  dots.enter()
    .append("circle")
      .attr("class", function(d) {return race + ' dot ' + d.state})
      .attr("r", function(d) {
          // calculate proportion of selected minority of total drivers
          return calcDotSize( d.minority_stops_per_year / d.total_stops_per_year );
        })
      .attr("cx", function(d) { return x(d.white_rate); })
      .attr("cy", function(d) { return y(d.minority_rate); })
      .on('mouseover', function(d, i) {
        d3.select(this).classed('hover', true)
        tooltip.style('display', 'block');
        
        roundMinorityRate = Math.round(d.minority_rate)
        roundWhiteRate = Math.round(d.white_rate)
        
        if ( d.minority_race == 'Black' ) {
            displayRace = d.minority_race.toLowerCase()
          } else {
            displayRace = d.minority_race;
        };

        if (roundMinorityRate == 1) {
          minorityRateLabel = rate_type.replace('_rate', '')
        } else {
          minorityRateLabel = rate_type.replace('_rate', '') + 's'
        };

        if (roundWhiteRate == 1) {
          whiteRateLabel = rate_type.replace('_rate', '')
        } else {
          whiteRateLabel = rate_type.replace('_rate', '') + 's'
        };

        switch(rate_type) {
          case 'stop_rate':
              tooltip.html(
                "<div class='location'>"+d.location+", "+d.state+"</div>"+
                "<div>"+roundMinorityRate+" "+minorityRateLabel+" per 100 "+displayRace+" drivers</div>"+
                "<div>"+roundWhiteRate+" "+whiteRateLabel+" per 100 white drivers</div>"
              );
            break;
          case 'search_rate':
              tooltip.html(
                "<div class='location'>"+d.location+", "+d.state+"</div>"+
                "<div>"+roundMinorityRate+" "+minorityRateLabel+" per 100 stops of "+displayRace+" drivers</div>"+
                "<div>"+roundWhiteRate+" "+whiteRateLabel+" per 100 stops of white drivers</div>"
              );
            break;
          case 'arrest_rate':
              tooltip.html(
                "<div class='location'>"+d.location+", "+d.state+"</div>"+
                "<div>"+roundMinorityRate+" "+minorityRateLabel+" per 100 stops of "+displayRace+" drivers</div>"+
                "<div>"+roundWhiteRate+" "+whiteRateLabel+" per 100 stops of white drivers</div>"
              );
            break;
          case 'hit_rate':
              tooltip.html(
                "<div class='location'>"+d.location+", "+d.state+"</div>"+
                "<div>"+roundMinorityRate+" "+minorityRateLabel+" per 100 searches of "+displayRace+" drivers</div>"+
                "<div>"+roundWhiteRate+" "+whiteRateLabel+" per 100 searches of white drivers</div>"
              );
            break;
          case 'inferred_threshold':
              tooltip.html(
                "<div class='location'>"+d.location+", "+d.state+"</div>"+
                "<div>"+roundMinorityRate+"% search threshold for "+displayRace+" drivers</div>"+
                "<div>"+roundWhiteRate+"% search threshold for white drivers</div>"
              );
            break;
          default:
            tooltip.html(
                "<div class='location'>"+d.location+", "+d.state+"</div>"
              );
        };

        tooltip.style('display', 'block');
        tooltip.style("left", (d3.event.pageX - 30) + "px")
        tooltip.style("top", (d3.event.pageY - 80) + "px");
      })
      .on('mouseout', function(d, i) {
        d3.select(this).classed('hover', false)
        tooltip.style('display', 'none');
      });
};


function calcDotSize(val) {
  val = val * 500;
  //r = √(Area of circle / π)
  var radius = Math.sqrt(val/Math.PI);
  return radius;
};


function zeroOrNumber(number) {
  if (isNaN(number)) {
    result = 0;
  } else {
    result = number;
  }
  return result;
};


function fillStateSelector(rate_type) {
  
  var div = d3.select('#' + rate_type + '_states_dropdown')

  if (rate_type == 'outcome') {
    statesArray = rateTypeStates['search_rate']
    rateTypeStates['arrest_rate'].forEach( function(d) {
      if (statesArray.indexOf(d) == -1) {
        statesArray.push(d)
      };
    });
  } else {
    statesArray = rateTypeStates[rate_type]
  };

  // add dropdown label with count of states
  div.select('button')
    .text('\n' + statesArray.length + ' states\n')
      .append('span')
        .classed("caret", true)
  
  button_list = div.select('ul')
    
  // add all option at top
  button_list.append('li')
    .attr('title', 'All')
    .append('a')
    .text('All')

  // add option for each state
  statesArray.forEach( function(d) {
    button_list.append('li')
      .attr('title', d)
      .append('a')
        .text(stateNames[d])
  })

  // add click event to all options
  div.selectAll('li')
    .on('click', function(d) {
      stateAbbrv = d3.select(this).attr('title')
      stateName = d3.select(this).text()
      selected_race = d3.select('#' + rate_type + '_race_btns')
        .selectAll('button')
        .filter('.active')
        .text();

      if (stateName == 'All') {
        // get count of li for label when all states are selected
        statesCount = d3.select(this.parentNode).selectAll('li')[0].length - 1
        stateName = '\n' +statesCount+ ' states\n'
      };

      if (rate_type == 'outcome') { 
          focusDots(stateAbbrv, selected_race, 'search_rate');
          focusDots(stateAbbrv, selected_race, 'arrest_rate');
        } else { 
          focusDots(stateAbbrv, selected_race, rate_type);
      };
      // set the value and text of the button
      div.select('button')
        .attr('value', stateAbbrv)
        .text('\n' + stateName + '\n')
          .append('span')
            .classed("caret", true);
    });
};


function focusDots(state, race, rate_type) {
  var div_id = "#" + rate_type + "_chart";
  circles = d3.select(div_id).selectAll("circle")

  // remove focus from all dots
  circles.classed('focused', false)

  if (state == 'All' && race == 'Both') {
    // bring all dots back into normal focus
    circles.classed('unfocused', false)
  } else if (state == 'All') {
    // unfocus all dots
    circles.classed('unfocused', true)
    // re-focus dots with selected race
    circles.filter('.' + race)
      .classed('unfocused', false)
      .classed('focused', true)
      .moveToFront()
  } else if (race == 'Both') {
    // unfocus all dots
    circles.classed('unfocused', true)
    // re-focus dots with selected state
    circles.filter('.' + state)
      .classed('unfocused', false)
      .classed('focused', true)
      .moveToFront()
  } else {
    // unfocus all dots
    circles.classed('unfocused', true)
    // re-focus dots with selected state and race
    circles.filter('.' + state).filter('.' + race)
      .classed('unfocused', false)
      .classed('focused', true)
      .moveToFront()
  }  
  
};


d3.selectAll(".race-btn").filter('.scatter')
  .on("click", function(d) {
    race = d3.select(this).text();
    rate_type = d3.select(this).attr('id').replace('_' + race + '_btn', '');
    if ( d3.select(this).classed('inactive')) {
      // switch the other buttons to inactive
      d3.select(this.parentNode)
        .selectAll(".race-btn")
        .classed("inactive", true);
      // make all buttons inactive
      d3.select(this.parentNode).selectAll('button')
        .classed("active", false)
        .classed("inactive", true);
      // switch this button to active
      d3.select(this)
        .classed("inactive", false)
        .classed("active", true);
      
      var state = d3.select('#' + rate_type + '_states_dropdown')
        .select('button')
        .attr("value");

      if (rate_type == 'outcome') {
        focusDots(state, race, 'search_rate');
        focusDots(state, race, 'arrest_rate');
      } else {
        focusDots(state, race, rate_type);
      };
    };
  });
