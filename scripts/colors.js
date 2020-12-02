// code from:
// https://observablehq.com/@d3/world-airports?collection=@d3/d3-geo

/*** global variable/s ***/
const width = 1000;

/*** helper function ***/
function mapHeight(projection, outline) {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
function drawMap(world, data) {
  const land = topojson.feature(world, world.objects.land);
  const graticule = d3.geoGraticule10();
  const outline = { type: "Sphere" };
  const projection = d3.geoTransverseMercator();
  const path = d3.geoPath(projection);

  const svg = d3.select('#viz')
    .append("svg")
    .attr("viewBox", [0, 0, width, mapHeight(projection, outline)]);

  const defs = svg.append("defs");

  defs.append("path")
      .attr("id", "outline")
      .attr("d", path(outline));

  defs.append("clipPath")
    .attr("id", "clip")
    .append("use")
    .attr("xlink:href", new URL("#outline", location));

  const g = svg.append("g")
    .attr("clip-path", `url(${new URL("#clip", location)})`);

  g.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("fill", "white");

  g.append("path")
    .attr("d", path(graticule))
    .attr("stroke", "black")
    .attr("stroke-width", "2.5")
    .attr("fill", "none");

  g.append("path")
    .attr("d", path(land))
    .attr("fill", "black");

  svg.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("stroke", "#000")
    .attr("fill", "none");

  svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr('class', 'gem')
    .attr('fill', 'white')
    .attr("transform", d => `translate(${projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])})`)
    .attr("r", 1.5)
    .style('cursor', 'cell');
  
  var tooltip = d3.select("#toolTip")
  .append("div")
  .attr('class', 'toolTip');

  function click(event, d){
    // debugger
    d3.select(this)
    tooltip
    .html("")
    .append("a")
    .attr('href', `${d.link}`)
    .attr('class', 'toolTipData')
    .append("text")
    .html(`Name: <b>${d.title}<br>`)
    .append("text")
    .html(`Carat Weight: <b>${d.caratWeight}<br>`)
    .append("text")
    .html(`Description: <b>${d.color}<br>`)
    .append('img')
    .data(data)
    .attr('class', 'toolTipImage')
    // .attr('width', 340)
    // .attr('height', 100)
    // .html(`<img src=${appendImage}>`)
    .attr('src', function(d) {
      if (d.filename === "NMNH-501014.jpg" 
      || d.filename === "NMNH-503014.jpg" 
      || d.filename === "NMNH-504077.jpg"
      || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
      || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
      || d.filename === "NMNH-504085.jpg"
      || d.filename === "not found.jpg"){  
        return "downSamples/JPEG/placeholder-01.svg";
      } else {return 'downSamples/JPEG/' + d.filename; }})
    }

  d3.selectAll('.gem')
    .on("click", click);
  
}

/*** load data ***/
async function loadData() {
  const world = await d3.json('data/land-50m.json');
  const airports = await d3.json('data/data.json');

  drawMap(world, airports)
}

loadData();

// d3.json('data/data.json').then(function(data){
//   // var width = 1520;
//   // var height = 1000;

  

//   var tooltip = d3.select("#toolTip")
//   .append("div")
//   .attr('class', 'toolTip');

//   // const xScale = d3.scaleLinear()
//   // .domain([-90, 90])
//   // .range([0, width])
//   // const yScale = d3.scaleLinear()
//   // .domain([-180, 180])
//   // .range([0, height]); 
//   // var vertices = function(d){return d.geometry.coordinates};
//   // voronoi = d3.voronoi().size([width,height]);

//   var svg = d3.select('#viz')
//   .append('svg')
//   .attr('class', 'map')
//   .attr('width', width)
//   .attr('height', height);

  
  // svg.append("g")
  //   .attr("class", "polygons")
  //   .selectAll("path")
  //   .data(voronoi.polygons(vertices))
  //   .enter().append("path")
  //   .attr("d", function(d){return "M"+d.join("L")+"Z"});

  // svg.selectAll('g')
  // .data(data)
  // .join('circle')
  // .attr('class', 'gem')
  // .attr('fill', 'white')
  // .attr('cx', d => xScale(d.geometry.coordinates[1]))
  // .attr('cy', d => yScale(d.geometry.coordinates[0]))
  // .attr('r', '2.5')
  // .style('cursor', 'cell');
  // .on("mouseover", function(event, d) {
  //   tooltip
  //   .html("")
  //   .append("div")
  //   .attr('class', 'toolTipData')
  //   .select("text")
  //   .data(data)
  //   .join("text")
  //   .html(function(d) { return  "Name: " + "<b>" + d.title + "</b>" + "<br/>" 
  //   + "Carat Weight: " + "<b>" + d.caratWeight + "</b>" + "<br/>" 
  //   + "Description: " + "<b>" + d.lowercaseName + "</b>" + "<br/>" 
  //   + "<a href=" + d.link + ' target="_blank"' + "><b>Link</b></a>" + "<br/>" + "Photo:"; })
  //   .append('img')
  //   .attr('class', 'toolTip')
  //   .style('color', 'red')
  //   .attr('width', 340)
  //   .attr('height', 100)
  //   .attr('src', function(d) { 
  //     if (d.filename === "NMNH-501014.jpg" 
  //     || d.filename === "NMNH-503014.jpg" 
  //     || d.filename === "NMNH-504077.jpg"
  //     || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
  //     || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
  //     || d.filename === "NMNH-504085.jpg"
  //     || d.filename === "not found.jpg"){  
  //       return 'downSamples/JPEG/placeholder-01.svg';
  //     } else {return 'downSamples/JPEG/' + d.filename; }})
  //     return tooltip.style("visibility", "visible") 
  // })
  // .on("click", function(event, d) {
  //   tooltip
  //   .html("")
  //   .append("div")
  //   .attr('class', 'toolTipData')
  //   .selectAll("text")
  //   .data(data)
  //   .join("text")
  //   .html(function(d) { return  "Name: " + "<b>" + d.title + "</b>" + "<br/>" 
  //   + "Carat Weight: " + "<b>" + d.caratWeight + "</b>" + "<br/>" 
  //   + "Description: " + "<b>" + d.lowercaseName + "</b>" + "<br/>" 
  //   + "<a href=" + d.link + ' target="_blank"' + "><b>Link</b></a>" + "<br/>" + "Photo:"; })
  //   .append('img')
  //   .attr('class', 'toolTip')
  //   .attr('width', 340)
  //   .attr('height', 100)
  //   .attr('src', function(d) {
  //     if (d.filename === "NMNH-501014.jpg" 
  //     || d.filename === "NMNH-503014.jpg" 
  //     || d.filename === "NMNH-504077.jpg"
  //     || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
  //     || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
  //     || d.filename === "NMNH-504085.jpg"
  //     || d.filename === "not found.jpg"){  
  //       return "downSamples/JPEG/placeholder-01.svg";
  //     } else {return 'downSamples/JPEG/' + d.filename; }})
  //   return tooltip.style("visibility", "visible") 
  // })

//   function click(event, d){
//     // debugger
//     d3.select(this)
//     tooltip
//     .html("")
//     .append("a")
//     .attr('href', `${d.link}`)
//     .attr('class', 'toolTipData')
//     .append("text")
//     .html(`Name: <b>${d.title}<br>`)
//     .append("text")
//     .html(`Carat Weight: <b>${d.caratWeight}<br>`)
//     .append("text")
//     .html(`Description: <b>${d.color}<br>`)
//     .append('img')
//     .data(data)
//     .attr('class', 'toolTip')
//     .attr('width', 340)
//     .attr('height', 100)
//     // .html(`<img src=${appendImage}>`)
//     .attr('src', function(d) {
//       if (d.filename === "NMNH-501014.jpg" 
//       || d.filename === "NMNH-503014.jpg" 
//       || d.filename === "NMNH-504077.jpg"
//       || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
//       || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
//       || d.filename === "NMNH-504085.jpg"
//       || d.filename === "not found.jpg"){  
//         return "downSamples/JPEG/placeholder-01.svg";
//       } else {return 'downSamples/JPEG/' + d.filename; }})
//     }

//   d3.selectAll('.gem')
//     .on("click", click);
//     //.on("mousemove", mousemove)
//     // .on('mouseout', mouseout)
// });


///// Dashboard Carat Chart /////////
  let bins;    
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
        meterWidth = 350,
        height = 125 - margin.top - margin.bottom;
  
  
    var x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([margin.left, meterWidth - margin.right]);
      
    var y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height - margin.bottom, margin.top]);
  
    var svg = d3.select('#viz3')
      .append('svg')
      .attr('width', meterWidth)
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

///////// Dashboard Color Chart ////////
d3.json('data/colorCats.json').then(function(data){
  
  var margin = ({top: 0, right: 0, bottom: 25, left: 0})
      meterWidth = 430 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.color))
    .range([margin.left, meterWidth * .8])
  
  var y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height - margin.bottom, margin.top]);
  var svg1 = d3.select('#viz4')
  .append('svg')
  .attr('width', meterWidth)
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
