d3.json('data/colorCats.json').then(function(data){
  
  var margin = ({top: -150, right: 0, bottom: 0, left: 0})
  width = 2000 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

  var tooltip = d3.select("#toolTip")
  .append("div")
  .style("color", "white");

  // vertices = function(d){return [d.latitude*width,d.longitude*height]}; 
  vertices = d3.range(100).map(function(d){ 
    return [Math.random()*width,Math.random()*height]; 
  })

  // points = [];
  // function makePoints(){
  //   data.forEach(function(d) {
  //   points.push(d.latitude)})}
  
  // makePoints();

    // d.latitude, d.longitude]
  voronoi = d3.voronoi().size([width,height]);
  var svg = d3.select('#viz')
    .append('svg')
    .attr("fill", "white")
    .attr("width", "100%")
    .attr("height", "100%");
    
    svg.append("g")
    .attr("class", "polygons")
    .selectAll("path")
    .data(voronoi.polygons(vertices))
    .enter().append("path")
    .attr("d", function(d){return "M"+d.join("L")+"Z"});
    
    svg.append("g")
    .selectAll("circle")
    
    .data(vertices)
    .enter().append("circle")
    .attr("cx", function(d){return d[0]; })
    .attr("cy", function(d){return d[1]; })
    .attr("r", "2.5")
    .attr("fill", "black")
    .on("mouseover", function(event, d) {
      tooltip
      .html("")
      .append("div")
      .attr('class', 'toolTipData')
      .selectAll("text")
      .data(data)
      .join("text")
      .html(function(d) { return  "Name: " + "<b>" + d.title + "</b>" + "<br/>" 
      + "Carat Weight: " + "<b>" + d.caratWeight + "</b>" + "<br/>" 
      + "Description: " + "<b>" + d.lowercaseName + "</b>" + "<br/>" 
      + "<a href=" + d.link + ' target="_blank"' + "><b>Link</b></a>" + "<br/>" + "Photo:"; })
      .append('img')
      .attr('class', 'toolTip')
      .attr('width', 340)
      .attr('height', 100)
      .attr('src', function(d) { 
        if (d.filename === "NMNH-501014.jpg" 
        || d.filename === "NMNH-503014.jpg" 
        || d.filename === "NMNH-504077.jpg"
        || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
        || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
        || d.filename === "NMNH-504085.jpg"
        || d.filename === "not found"){  
          return "downSamples/JPEG/placeholder-01.svg";
        } else {return 'downSamples/JPEG/' + d.filename; }})
        return tooltip.style("visibility", "visible") 
    })
    .on("click", function(event, d) {
      tooltip
      .html("")
      .append("div")
      .attr('class', 'toolTipData')
      .selectAll("text")
      .data(data)
      .join("text")
      .html(function(d) { return  "Name: " + "<b>" + d.title + "</b>" + "<br/>" 
      + "Carat Weight: " + "<b>" + d.caratWeight + "</b>" + "<br/>" 
      + "Description: " + "<b>" + d.lowercaseName + "</b>" + "<br/>" 
      + "<a href=" + d.link + ' target="_blank"' + "><b>Link</b></a>" + "<br/>" + "Photo:"; })
      .append('img')
      .attr('class', 'toolTip')
      .attr('width', 340)
      .attr('height', 100)
      .attr('src', function(d) {
        if (d.filename === "NMNH-501014.jpg" 
        || d.filename === "NMNH-503014.jpg" 
        || d.filename === "NMNH-504077.jpg"
        || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
        || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
        || d.filename === "NMNH-504085.jpg"
        || d.filename === "not found"){  
          return "downSamples/JPEG/placeholder-01.svg";
        } else {return 'downSamples/JPEG/' + d.filename; }})
      return tooltip.style("visibility", "visible") 
    });


  ///// Dashboard Carat Chart /////////
  // let bins;    
  var caratWeights =[];
  var colors =[];
  d3.json('data/data.json').then(function(data){ 
    data.forEach(function(d){
      if(d.caratWeight!=null)
      caratWeights.push(d.caratWeight);
    })
    
  
    let bin = d3.bin().domain([0, 100]).thresholds(50);
  
    let bins = bin(caratWeights);
  
  
    var margin = ({top: 2, right: 0, bottom: 2, left: 0})
        width = 350,
        height = 125 - margin.top - margin.bottom;
  
  
    var x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([margin.left, width - margin.right]);
      
    var y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height - margin.bottom, margin.top]);
  
    var svg = d3.select('#viz3')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr("fill", "white");
      
      svg.append("g")
        .attr("stroke", "white")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 5)
        .selectAll("line")
        .data(bins)
        .join("line")
        .attr("x1", d => x(d.x0) + 2.5)
        .attr("x2", d => x(d.x0) + 2.5)
        .attr("y2", d => y(d.length))
        .attr("y1", d => y(height - d.length))
      svg.append("line")
        .each(function(d) {this._current = d;} )
  });
});
///////// Dashboard Color Chart ////////
d3.json('data/colorCats.json').then(function(data){
  
  var margin = ({top: 0, right: 0, bottom: 25, left: 0})
      width = 430 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.color))
    .range([margin.left, width * .8])
  
  var y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height - margin.bottom, margin.top]);
  var svg1 = d3.select('#viz4')
  .append('svg')
  .attr('width', width)
  .attr('height', height);
  
  svg1.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", function(d) { return d.color; })
    .attr("x", function(d){return xScale(d.color) })
    .attr("width", 22)
    .attr("rx", 11)
    .attr("y", d => y(d.value))
    .attr("height", d => y(0) - y(d.value) + 35)
  });