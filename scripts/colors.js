// code from:
// https://observablehq.com/@d3/world-airports?collection=@d3/d3-geo

/*** global variable/s ***/
const width = 1000;
/*** helper function ***/
function mapHeight(projection, outline) {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width - 185, outline)).bounds(outline);
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
    .attr("fill", "#fffff0");
    
  g.append("path")
    .attr("d", path(graticule))
    .attr("stroke", "#010b13")
    .attr("stroke-width", "2.5")
    .attr("fill", "none");

  g.append("path")
    .attr("d", path(land))
    .attr("fill", "#010b13");

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
    // .attr('stroke', 'black')
    // .attr('stroke-width', '2.5')
    // .attr("transform", d => `translate(${projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])})`)
    .attr("transform", d => `translate(${projection([d.longitude, d.latitude])})`)
    .attr("r", .75)
    .style('cursor', 'cell');
  
  var tooltip = d3.selectAll("#toolTip");

  
  function hover(event, d){
    d3.select(this)
    .attr('r', 4)
    .style("transition", "100ms ease-in-out, transform 100ms ease")
  }
  function mouseout(event, d){
    d3.select(this)
    .attr('r', .75)
  }

  function click(event, d){
    d3.select('.item')
      .style('border-color', '#303030');
      d3.select('.rockRanger')
      .style('color', '#fffff0')
      d3.select('.toolTip')
      .remove()
      .join('toolTip')
      .append("div")
      .attr('class', 'toolTip');
      d3.select(this)
      tooltip
      .html("")
      .append("a")
      .attr('href', `${d.link}`)
      .attr('target', '_blank')
      .attr('class', 'toolTipData')
      .append("text")
      .html(`<span class="name">${d.title}</span><br>`)
      // .append("text")
      // .html(`Carat Weight: <b>${d.caratWeight}<br>`)
      // .append("text")
      // .html(`Cut: <b>${d.cut}<br>`)
      // .append("text")
      // .html(`Description: <b>${d.color}<br>`)
      .append("text")
      .html(`<b>${d.description[0].label0}</b> ${d.description[0].conten0}<br>
      <b>${d.description[1].label1}</b> ${d.description[1].content1}<br>
      <b>${d.description[2].label2}</b> ${d.description[2].content2}<br>
      <b>${d.description[3].label3}</b> ${d.description[3].content3}<br>
      <b>${d.description[4].label4}</b> ${d.description[4].content4}`)
      .append('img')
      // .data(data)
      .attr('class', 'toolTipImage')
      .attr('width', 340)
      // .attr('height', 100)
      // .html(`<img src=${appendImage}>`)
      .attr('src', function() {
        if (d.filename === "NMNH-501014.jpg" 
        || d.filename === "NMNH-503014.jpg" 
        || d.filename === "NMNH-504077.jpg"
        || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
        || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
        || d.filename === "NMNH-504085.jpg"
        || d.filename === "not-found.jpg"){  
          return "downSamples/JPEG/placeholder-01.svg";
        } else {return 'downSamples/JPEG/' + d.filename; }})
      }
  d3.selectAll('.gem')
    .on("click", click)
    .on('mouseover', hover)
    .on("mouseout", mouseout)
  
}

/*** load data ***/
async function loadData() {
  const world = await d3.json('data/land-50m.json');
  const gems = await d3.json('data/flatData.json');
  console.log(gems);
  drawMap(world, gems)
}

loadData();

async function loadColorData() {
  const world = await d3.json('data/land-50m.json');
  const gemColors = await d3.json('data/colorCats.json');
  console.log(gemColors);
  drawMap(world, gemColors)
}

///// Dashboard Carat Chart /////////
  // let bins;    
  // var caratWeights =[];
  // var colors =[];
  // d3.json('data/data.json').then(function(data){ 
  //   data.forEach(function(d){
  //     if(d.caratWeight!=null)
  //     caratWeights.push(d.caratWeight);
  //   })
    
  
  //   let bin = d3.bin().domain([0, 7500]).thresholds(1000);
  
  //   let bins = bin(caratWeights);
  
  
  //   var margin = ({top: 5, right: 0, bottom: 10, left: 0})
  //       meterWidth = 350,
  //       height = 135 + margin.top - margin.bottom;
  
  
  //   var x = d3.scaleLinear()
  //     .domain([bins[0].x0, bins[bins.length - 1].x1])
  //     .range([margin.left, meterWidth - margin.right]);
      
  //   var y = d3.scaleLinear()
  //     .domain([0, d3.max(bins, d => d.length)])
  //     .range([height - margin.bottom, margin.top]);
  
  //   var svg = d3.select('#viz3')
  //     .append('svg')
  //     .attr('width', meterWidth)
  //     .attr('height', height - margin.bottom)
  //     .attr("fill", "white");
      
  //     svg.append("g")
  //     .attr('height', height - margin.bottom)
  //       .attr("stroke", "#fffff0")
  //       .attr("stroke-linecap", "round")
  //       .attr("stroke-width", 5)
  //       .selectAll("line")
  //       .data(bins)
  //       .join("line")
  //       .attr("x1", d => x(d.x0) + 2.5)
  //       .attr("x2", d => x(d.x0) + 2.5)
  //       .attr("y2", d => y(d.length))
  //       .attr("y1", d => y(d.length - height))
  //     svg.append("text")
  //     .attr('class', 'meterText')
  //     .attr('x', 0)
  //     .attr('y', 130)
  //     .html("0 ct")
  // });

///////// Dashboard Color Chart ////////
d3.json('data/colorCats.json').then(function(data){
  var tooltip = d3.selectAll("#toolTip");
  var margin = ({top: 15, right: 0, bottom: 25, left: 0})
      meterWidth = 430 - margin.left - margin.right,
      height = 410 - margin.top - margin.bottom;
  
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
    .attr("y", d => y(0))
    .attr("height", d => y(0) - y(0) + 35)
    .on("mouseover", mouseover)
    .on('mouseout', mouseout)
    .on("click", function(event, d) {
      // debugger
      d3.select('.item')
      .style('border-color', function() { return d.color; })
      d3.select('.rockRanger')
      .style('color',function() { return d.color; });
      tooltip
      .html("")
      .data(d.data)
      .append("a")
      .attr('href', `${d.data.link}`)
      .attr('target', '_blank')
      .attr('class', 'toolTipData')
      .selectAll("text")
      .data(d.data)
      .join("text")
      .html(function(d) { return '<span class="name">' + d.title + '</span>' + "<br/>" 
      + '<b>' + d.description[0].label0 + '</b> ' + d.description[0].conten0 + '<br>'
      + '<b>' + d.description[1].label1 + '</b> ' + d.description[1].content1 + '<br>'
      + '<b>' + d.description[2].label2 + '</b> ' + d.description[2].content2 + '<br>'
      + '<b>' + d.description[3].label3 + '</b> ' + d.description[3].content3 + '<br>'
      + '<b>' + d.description[4].label4 + '</b> ' + d.description[4].content4 })
      .append('img')
      .attr('class', 'toolTipImage')
      .attr('width', 340)
      .attr('src', function(d) { 
        if (d.filename === "NMNH-501014.jpg" 
        || d.filename === "NMNH-503014.jpg" 
        || d.filename === "NMNH-504077.jpg"
        || d.filename === "NMNH-NMNH-MS-2018-00018.jpg" 
        || d.filename === "NMNH-NMNH-MS-2018-00019_screen.jpg"
        || d.filename === "NMNH-504085.jpg"
        || d.filename === "not-found.jpg"){  
          return 'downSamples/JPEG/placeholder-01.svg';
        } else {return 'downSamples/JPEG/' + d.filename; }})
        return tooltip.style("visibility", "visible") 
      });
    

    function mouseover(event, d){
      d3.select(this)
      // .attr('stroke', '#010b13')
      // .attr('stroke-width', 5)
      .attr("width", 27)
      .attr("rx", 13)
      .attr("height", d => y(0) - y(d.value) + 40)
      .attr("y", d => y(d.value)-5)
    }
    function mouseout(event, d){
      d3.select(this)
      .attr('stroke', 'none')
      .attr('stroke-width', 'none')
      .attr("width", 22)
      .attr("rx", 11)
      .attr("height", d => y(0) - y(d.value) + 35)
      .attr("y", d => y(d.value))
    }
    svg1.selectAll("rect")
    .transition()
    .duration(400)
    .ease(d3.easeBack)
    .attr("y", d => y(d.value))
    .attr("height", d => y(0) - y(d.value) + 35)
    .delay(function(d,i){console.log(i) ; return(i*10)});
  });

  