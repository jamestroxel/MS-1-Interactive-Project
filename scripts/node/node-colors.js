
const fs = require('fs')
let data =  JSON.parse(fs.readFileSync('../../data/data.json'));
// console.log(data);
let colorCount = [];


// var pink = [],
//     red = [],
//     redOrange = [],
//     orange = [],
//     yellowOrange = [],
//     yellow = [],
//     lightYellowGreen = [],
//     yellowGreen = [],
//     green = [],
//     darkGreen = [],
//     blueGreen = [],
//     lightBlue = [],
//     blue = [],
//     reddishBlue = [],
//     purple = [],
//     indigo = [],
//     rainbow = [],
//     blackGrey = [],
//     whiteClear = [];

let gemColors =  [{
    DeepPink: [],
    red: [],
    orangeRed: [],
    DarkOrange: [],
    orange: [],
    gold: [],
    greenyellow: [],
    limegreen: [],
    seagreen: [],
    mediumseagreen: [],
    lightseagreen: [],
    deepskyblue: [],
    dodgerblue: [],
    blue: [],
    navy: [],
    indigo: [],
    purple: [],
    blackGrey: [],
    white: [],
    rainbow: []
}];
let colorCats = [];

function analyzeData(){
    let colorNow;
  
    
    // go through the list of textiles
    data.forEach(function(i) {
        colorNow = i.color;
        let match = false;
        
        // see if their location already exists the allplaces array
        colorCount.forEach(function(c){
            if(c.name==colorNow){
                c.count++;
                match=true;
            }
        });
        // if not create a new entry for that place name
        if(!match){
            colorCount.push({
                name: colorNow,
                count:1
            });
        }
    });
    // sort by amount of items in the list
    colorCount.sort((a, b) => (a.count < b.count) ? 1 : -1)
    console.log(colorCount)
}
analyzeData();
// console.log(colorCount);

function groupColors(data){
    console.log(data);
    data.forEach(d=>{
        console.log(d.name);
    let lowercaseName = d.color.toLowerCase()
    let title = d.title
    let longitude = d.geometry.coordinates[0]
    let latitude = d.geometry.coordinates[1]
    let caratWeight = d.caratWeight
    let primaryImage = d.primaryImage
    let filename = d.filename
    let link = d.link
    if (lowercaseName.includes("pink") 
        && !lowercaseName.includes("red")
        && !lowercaseName.includes("gray")) {
        gemColors[0].DeepPink.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("red") 
        && !lowercaseName.includes("orange")
        && !lowercaseName.includes("purple")
        && !lowercaseName.includes("gray")) {
        gemColors[0].red.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("red") 
        && lowercaseName.includes("orange")
        && !lowercaseName.includes("gray")) {
        gemColors[0].orangeRed.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("orange") 
        || lowercaseName.includes("brown") 
        && !lowercaseName.includes("yellow")
        && !lowercaseName.includes("green")
        && !lowercaseName.includes("gray")) {
        gemColors[0].DarkOrange.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("yellow") 
        && lowercaseName.includes("orange")
        && !lowercaseName.includes("gray")) {
        gemColors[0].orange.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("yellow") 
        && !lowercaseName.includes("orange")
        && !lowercaseName.includes("green")
        && !lowercaseName.includes("gray")) {
        gemColors[0].gold.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("yellow") 
        && lowercaseName.includes("green")) {
        gemColors[0].greenyellow.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("yellow") 
        && lowercaseName.includes("green")
        && !lowercaseName.includes("gray")) {
        gemColors[0].limegreen.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("green") 
        && !lowercaseName.includes("yellow") 
        && !lowercaseName.includes("dark")
        && !lowercaseName.includes("blue")
        && !lowercaseName.includes("gray")) {
        gemColors[0].seagreen.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("green") 
        && lowercaseName.includes("dark") 
        && !lowercaseName.includes("yellow") 
        && !lowercaseName.includes("blue")
        && !lowercaseName.includes("gray")) {
        gemColors[0].mediumseagreen.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("green") 
        && lowercaseName.includes("blue") 
        && !lowercaseName.includes("yellow")
        && !lowercaseName.includes("gray")) {
        gemColors[0].lightseagreen.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("blue") 
        && lowercaseName.match("light") 
        && !lowercaseName.includes("yellow")
        && !lowercaseName.includes("green")
        && !lowercaseName.includes("gray")) {
        gemColors[0].deepskyblue.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("blue")  
        && !lowercaseName.includes("red") 
        && !lowercaseName.includes("yellow")
        && !lowercaseName.includes("green")
        && !lowercaseName.includes("purple")
        && !lowercaseName.includes("violet")
        && !lowercaseName.includes("gray")) {
        gemColors[0].dodgerblue.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("blue") 
        && lowercaseName.includes("medium")
        || lowercaseName.includes("dark")
        && !lowercaseName.includes("red") 
        && !lowercaseName.includes("yellow")
        && !lowercaseName.includes("green")
        && !lowercaseName.includes("purple")
        && !lowercaseName.includes("violet")
        && !lowercaseName.includes("gray")) {
        gemColors[0].blue.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("blue")  
        && lowercaseName.includes("red")
        || lowercaseName.includes("purple")
        && !lowercaseName.includes("green")
        && !lowercaseName.includes("dark")
        && !lowercaseName.includes("gray")) {
        gemColors[0].navy.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("purple")  
        || lowercaseName.includes("violet")
        && !lowercaseName.includes("gray")) {
        gemColors[0].indigo.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("indigo")  
        || lowercaseName.includes("violet")
        && !lowercaseName.includes("green")
        && !lowercaseName.includes("gray")) {
        gemColors[0].purple.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("various")  
        || lowercaseName.includes("multi")
        || lowercaseName.includes("rainbow")) {
        gemColors[0].rainbow.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("colorless")  
        || lowercaseName.includes("clear")
        || lowercaseName.includes("white")) {
        gemColors[0].white.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    if (lowercaseName.includes("gray")  
        || lowercaseName.includes("black")
        || lowercaseName.includes("grey")) {
        gemColors[0].blackGrey.push({lowercaseName,
            title,
            longitude,
            latitude,
            caratWeight,
            primaryImage,
            filename,
            link})
    }
    });
    console.log(gemColors);
}

groupColors(data);

// function countGroups(){
//     colorCats.push({pink: gemColors[0].pink.length,
//                     red: gemColors[0].red.length,
//                     redOrange: gemColors[0].redOrange.length,
//                     orange: gemColors[0].orange.length,
//                     yellowOrange: gemColors[0].yellowOrange.length,
//                     yellow: gemColors[0].yellow.length,
//                     lightYellowGreen: gemColors[0].lightYellowGreen.length,
//                     yellowGreen: gemColors[0].yellowGreen.length,
//                     green: gemColors[0].green.length,
//                     darkGreen: gemColors[0].darkGreen.length,
//                     blueGreen: gemColors[0].blueGreen.length,
//                     lightblue: gemColors[0].lightBlue.length,
//                     blue: gemColors[0].blue.length,
//                     reddishBlue: gemColors[0].reddishBlue.length,
//                     purple: gemColors[0].purple.length,
//                     indigo: gemColors[0].indigo.length,
//                     rainbow: gemColors[0].rainbow.length,
//                     blackGrey: gemColors[0].blackGrey.length,
//                     whiteClear: gemColors[0].whiteClear.length,});
// };
// countGroups();
// console.log(colorCats);
function countGroups(){
    colorCats.push({color: "DeepPink",
                    value: gemColors[0].DeepPink.length,
                    data: gemColors[0].DeepPink},
                    {color: "red",
                    value: gemColors[0].red.length,
                    data: gemColors[0].red},
                    {color: "orangeRed",
                    value: gemColors[0].orangeRed.length,
                    data: gemColors[0].orangeRed},
                    {color: "DarkOrange",
                    value: gemColors[0].DarkOrange.length,
                    data: gemColors[0].DarkOrange},
                    {color: "orange",
                    value: gemColors[0].orange.length,
                    data: gemColors[0].orange},
                    {color: "gold",
                    value: gemColors[0].gold.length,
                    data: gemColors[0].gold},
                    {color: "greenyellow",
                    value: gemColors[0].greenyellow.length,
                    data: gemColors[0].greenyellow},
                    {color: "limegreen",
                    value: gemColors[0].limegreen.length,
                    data: gemColors[0].limegreen},
                    {color: "seagreen",
                    value: gemColors[0].seagreen.length,
                    data: gemColors[0].seagreen},
                    {color: "mediumseagreen",
                    value: gemColors[0].mediumseagreen.length,
                    data: gemColors[0].mediumseagreen},
                    {color: "lightseagreen",
                    value: gemColors[0].lightseagreen.length,
                    data: gemColors[0].lightseagreen},
                    {color: "deepskyblue",
                    value: gemColors[0].deepskyblue.length,
                    data: gemColors[0].deepskyblue},
                    {color: "dodgerblue",
                    value: gemColors[0].dodgerblue.length,
                    data: gemColors[0].dodgerblue},
                    {color: "blue",
                    value: gemColors[0].blue.length,
                    data: gemColors[0].blue},
                    {color: "navy",
                    value: gemColors[0].navy.length,
                    data: gemColors[0].navy},
                    {color: "indigo",
                    value: gemColors[0].indigo.length,
                    data: gemColors[0].indigo},
                    {color: "purple",
                    value: gemColors[0].purple.length,
                    data: gemColors[0].purple},
                    {color: "url(#grad1)",
                    value: gemColors[0].rainbow.length,
                    data: gemColors[0].rainbow},
                    {color: "#303030", 
                    value: gemColors[0].blackGrey.length,
                    data: gemColors[0].blackGrey},
                    {color: "white",
                    value: gemColors[0].white.length,
                    data: gemColors[0].white});
};
countGroups();
console.log(colorCats);

setTimeout(() => {
    fs.writeFileSync('../../data/colorCats.json', JSON.stringify(colorCats), 'utf8')
}, 5000)

