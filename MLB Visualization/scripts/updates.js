// Constants for the charts, that would be useful.
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 400;
const MARGIN = { left: 50, bottom: 50, top: 20, right: 20 };
const ANIMATION_DUATION = 1000;

const SMALL_CHART_WIDTH = 300;
const SMALL_CHART_HEIGHT = 300;


/**
 * Set up the website with proper DOM elements.
 */
export function setupWebsite() {
  setupAveragesChart();
  setupResultsChart();
  setupStatsChart();
  setupModernChart();
}

/**
 * Sets up the SVG for the season averages line chart.
 */
function setupAveragesChart() {
  let averagesChart = d3.select("#averages-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);
  averagesChart.append("g").classed("avg-line", true);
  averagesChart.append("g").classed("obp-line", true);
  averagesChart.append("g").classed("slg-line", true);
  averagesChart.append("g").classed("x-axis", true);
  averagesChart.append("g").classed("y-axis", true);

  averagesChart.append("text")
    .attr("x", SMALL_CHART_WIDTH / 2)
    .attr("y", SMALL_CHART_HEIGHT - MARGIN.bottom / 4)
    .attr("text-anchor", "middle")
    .text("Year");
  
  averagesChart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -SMALL_CHART_HEIGHT / 2)
    .attr("y", MARGIN.left / 3)
    .attr("text-anchor", "start")
    .text("Averages");

  averagesChart.append("rect")
    .attr("x", SMALL_CHART_WIDTH / 2 - 85)
    .attr("y", MARGIN.top)
    .attr("width", 50)
    .attr("height", 10)
    .style("fill", "blue")
  averagesChart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (SMALL_CHART_WIDTH / 2 - 60) + ", " + (3 * MARGIN.top / 4) + ")")
    .text("BAA");
  
  averagesChart.append("rect")
    .attr("x", SMALL_CHART_WIDTH / 2 - 25)
    .attr("y", MARGIN.top)
    .attr("width", 50)
    .attr("height", 10)
    .style("fill", "red")
  averagesChart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (SMALL_CHART_WIDTH / 2) + ", " + (3 * MARGIN.top / 4) + ")")
    .text("OBP");

  averagesChart.append("rect")
    .attr("x", SMALL_CHART_WIDTH / 2 + 35)
    .attr("y", MARGIN.top)
    .attr("width", 50)
    .attr("height", 10)
    .style("fill", "green")
  averagesChart.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (SMALL_CHART_WIDTH / 2 + 60) + ", " + (3 * MARGIN.top / 4) + ")")
    .text("SLG");
}
  
/**
 * Sets up the SVG for the season results pie chart.
 */
function setupResultsChart() {
  d3.select("#results-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);
}

/**
 * Sets up the SVG with labels for the stats bar chart.
 */
function setupStatsChart() {
  let statsChart = d3.select("#stat-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);
  statsChart.append("g").classed("stats-chart", true);
  statsChart.append("g").classed("x-axis", true);
  statsChart.append("g").classed("y-axis", true);
  statsChart.append("text")
    .attr("x", SMALL_CHART_WIDTH / 2)
    .attr("y", SMALL_CHART_HEIGHT - MARGIN.bottom / 4)
    .attr("text-anchor", "middle")
    .text("Year");
}

/**
 * Sets up the SVG for the modern chart having the WOBA or FIP towers.
 */
function setupModernChart() {
  let battingChart = d3.select("#modern-div").append("svg").style("width", CHART_WIDTH).style("height", CHART_HEIGHT);
  battingChart.append("g").classed("batting-chart", true);
  battingChart.append("g").classed("x-axis", true);
  battingChart.append("g").classed("y-axis", true);
}

/**
 * Updates the players select box with all players.
 * @param {object[]} players player Info
 */

export function updatePlayerSelect(players) {
  const playerSelect = d3.select('#players');
  playerSelect.selectAll("option").remove(); 

  let addedValues = [];
  players.forEach((player, i) => {
    let nameString = player.nameFirst + ' ' + player.nameLast;
    if (!addedValues.includes(nameString)) {
      playerSelect.append("option")
        .text(nameString)
        .property("value", player.playerID)
        .property("selected", i == 0);
      addedValues.push(nameString);
    }
  });
}
export function setupTable() {
  let tableHeaders = d3.select('#Table-div').append("thead").append("tr");
  let headers = ["yearID", "Team", "W","L","G","GS","CG","SHO","SV","IPouts","H","ER","HR","BB","SO","BAOpp","ERA","IBB","WP","HBP","BK","BFP","GF","R","SH","SF","GIDP"];
  tableHeaders.selectAll('th')
              .data(headers)
              .enter()
              .append('th')
              .text(function (header) { return header; })
} 

/* Consulted ChatGpt on setting up this function */
// export function updateTable(data) {
//   d3.select("#Table-div").select("thead").remove();
//   d3.select("#Table-div").select("tbody").remove();
//   let tableHeaders = d3.select('#Table-div')
//   tableHeaders.append("thead")
//               .append("tr")
//               .selectAll('th')
//               .data(Object.keys(data[0]))
//               .enter()
//               .append('th')
//               .text(d => d);
//   let tableBody = tableHeaders.append('tbody')
//                               .selectAll('tr')  
//                               .data(data)
//                               .enter()
//                               .append('tr')  ; 
//   tableBody.selectAll("td")
//            .data(d => Object.values(d))
//            .enter()
//            .append("td") 
//            .text(d => d);

// }

export function updateTable(data) {
  d3.select("#Table-div").select("tbody").remove();
  d3.select("#Table-div").select("thead").remove();
  let tableHeaders = d3.select('#Table-div');
  let headers = []
  if (d3.select('#player-type').node().value == "Batting") {
    headers = ["Year", "Team","G","AB","R","H","2B","3B","HR","RBI","SB","CS","BB","SO","IBB","HBP","SH","SF","GIDP"];
  }
  else {
    headers = ["Year", "Team", "W","L","G","GS","CG","SHO","SV","IPouts","H","ER","HR","BB","SO","BAOpp","ERA","IBB","WP","HBP","BK","BFP","GF","R","SH","SF","GIDP"];
  }
  /* Consulted ChatGpt on setting up this function */
  tableHeaders.append("thead")
              .append("tr")
              .selectAll('th')
              .data(headers)
              .enter()
              .append('th')
              .text(function (header) { return header; })
  let tableBody = tableHeaders.append('tbody')
                              .selectAll('tr')  
                              .data(data)
                              .enter()
                              .append('tr'); 
  tableBody.selectAll("td")
           .data(d => Object.values(d))
           .enter()
           .append("td") 
           .text(d => d);
}


/**
 * Updates the visualizations based on the given data.
 * Updates the bar chart using the x and y data provided.
 * @param {string} xData categorical independent variable
 * @param {number} yData dependent variable
 * @param data 
 * @param playerName
 */
export function updateWebsite(hitterData, wobaWeights) {
  updateAveragesChart(hitterData);
  updateResultsChart(hitterData[0]);
  updateStatsChart(hitterData);
  updateBattingChart(hitterData, wobaWeights);
  // Update the player image
  updatePlayerImage();
}

/**
* Updates the player image based on the given player name.
* @param {string} playerName
*/

  function updatePlayerImage() {
    const sel = document.getElementById("players");
    const playerName = sel.options[sel.selectedIndex].text;
    const [firstName, lastName] = playerName.split(' ');
    const firstInitial = firstName.charAt(0).toUpperCase();
    let imageFolder;

    if (firstInitial === 'J') {
        const firstTwoLetters = firstName.substring(0, 2).toUpperCase();
        if (firstTwoLetters >= 'JA' && firstTwoLetters <= 'JI') {
            imageFolder = 'FirstNameJaJi';
        } else if (firstTwoLetters >= 'JJ' && firstTwoLetters <= 'JU') {
            imageFolder = 'FirstNameJjJu';
        } else {
            imageFolder = `FirstName${firstInitial}`;
        }
    } else {
        imageFolder = `FirstName${firstInitial}`;
    }

    const imageName = `${firstName}_${lastName}.jpg`;
    const imageUrl = `http://localhost:8000/datasets/Card Images/${imageFolder}/${imageName}`;

    const imgElement = document.getElementById("player-image");
    imgElement.src = imageUrl;
    imgElement.alt = playerName;

    imgElement.onerror = function () {
        imgElement.onerror = null;
        imgElement.src = `http://localhost:8000/datasets/Card Images/FirstNameD/default.jpg`;
        imgElement.alt = "Default image";
    };
}

function updateAveragesChart(hitterData) {
  let years = hitterData.map((season) => new Date(parseInt(season.yearID), 0));
  let battingAvgs = hitterData.map((season) => season.H / season.AB || 0);
  let onBaseAvgs = hitterData.map((season) => (season.H + season.BB + season.HBP) / (season.AB + season.BB + season.HBP + season.SF) || 0);
  let sluggingAvgs = hitterData.map((season) => (season.H + season["2B"] + 2*season["3B"] + 3*season.HR) / season.AB || 0);

  let xScale = d3.scaleTime()
                  .domain([d3.min(years), d3.max(years)])
                  .range([0, SMALL_CHART_WIDTH - MARGIN.left - MARGIN.right]);
  let numTicks = d3.max(years).getFullYear() - d3.min(years).getFullYear() + 1;
  let xAxis = d3.axisBottom()
    .ticks(numTicks).tickFormat(d3.timeFormat('\'%y'));
  xAxis.scale(xScale);

  let yScale = d3.scaleLinear()
                  .domain([0, 1])
                  .range([SMALL_CHART_HEIGHT - MARGIN.top - MARGIN.bottom, 0])
                  .nice();
  let yAxis = d3.axisLeft();
  yAxis.scale(yScale);

  d3.select("#averages-div").select(".x-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (SMALL_CHART_HEIGHT - MARGIN.bottom) + ")")
    .call(xAxis);
  d3.select("#averages-div").select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
    .call(yAxis);
  let lineGenerator = d3.line()
    .x((d) => MARGIN.left + xScale(d.x))
    .y((d) => SMALL_CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y));
  let avgData = years.map((year, index) => {return {x: years[index], y: battingAvgs[index]}});
  d3.select(".avg-line").selectAll("path")
    .data([avgData])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "blue")
    .style("stroke-width", 4);
  let obpData = years.map((year, index) => {return {x: years[index], y: onBaseAvgs[index]}});
  d3.select(".obp-line").selectAll("path")
    .data([obpData])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "red")
    .style("stroke-width", 4);
  let slgData = years.map((year, index) => {return {x: years[index], y: sluggingAvgs[index]}});
  d3.select(".slg-line").selectAll("path")
    .data([slgData])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "green")
    .style("stroke-width", 4);
}

function updateResultsChart(seasonData) {

  let data;
  if (seasonData.AB + seasonData.BB + seasonData.HBP + seasonData.SF > 0) {
    data = [{stat: "GIDPs", amount: seasonData.GIDP},
      {stat: "Ks", amount: seasonData.SO},
      {stat: "BB Outs", amount: seasonData.AB - seasonData.H - seasonData.SO - seasonData.GIDP},
      {stat: "Sacrifices", amount: seasonData.SF + seasonData.SH},
      {stat: "HBPs", amount: seasonData.HBP},
      {stat: "Walks", amount: seasonData.BB},
      {stat: "Singles", amount: seasonData.H - seasonData["2B"] - seasonData["3B"] - seasonData.HR}, 
      {stat: "Doubles", amount: seasonData["2B"]}, 
      {stat: "Triples", amount: seasonData["3B"]}, 
      {stat: "Homers", amount: seasonData.HR}];
    }
    else {
      data = [{stat: "No Batting Data this season", amount: 1}];
    }

  let svg = d3.select("#results-div").select("svg")
      .append("g")
      .attr("transform", "translate(" + SMALL_CHART_WIDTH / 2 + "," + SMALL_CHART_HEIGHT / 2 + ")");

  let color = d3.scaleOrdinal(d3.schemeRdBu[10]);

  let pie = d3.pie();
  pie.value(function (d) {
      return d.amount;
  });
  let pieData = pie(data);
  let arc = d3.arc();
  arc.outerRadius(125);
  arc.innerRadius(0);

  let groups = svg.selectAll("g").data(pieData)
      .join("g");
  groups.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.stat));
  groups.append("text")
      .text(d => d.data.stat)
      .attr("transform", d => "translate(" + arc.centroid(d) + ")")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("font-size", "10px");
}

function updateStatsChart(hitterData) {

  let years = hitterData.map((season) => new Date(parseInt(season.yearID), 0));
  let stats = hitterData.map((season) => season.H);

  d3.select("#stat-div").select("svg").append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -SMALL_CHART_HEIGHT / 2)
    .attr("y", MARGIN.left / 3)
    .attr("text-anchor", "start")
    .text("Hits");

  let xScale = d3.scaleBand()
                  .domain(years)
                  .range([MARGIN.left, SMALL_CHART_WIDTH - MARGIN.right])
                  .padding(0.2);
  let numTicks = d3.max(years).getFullYear() - d3.min(years).getFullYear() + 1;
  let xAxis = d3.axisBottom()
    .ticks(numTicks).tickFormat(d3.timeFormat('\'%y'));
  xAxis.scale(xScale);

  let yScale = d3.scaleLinear()
      .domain([0, d3.max([1, ...stats])])
      .range([SMALL_CHART_HEIGHT - MARGIN.bottom, MARGIN.top])
      .nice();
  let yAxis = d3.axisLeft();
  yAxis.scale(yScale);

  d3.select("#stat-div").select(".x-axis")
    .attr("transform", "translate(0," + (SMALL_CHART_HEIGHT - MARGIN.bottom) + ")")
    .call(xAxis);
  d3.select("#stat-div").select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + ",0)")
    .call(yAxis);
  const statData = years.map((year, index) => {return {x: years[index], y: stats[index]}});
  console.log(statData);
  d3.select(".stats-chart").selectAll("rect")
    .data(statData)
    .join("rect")
    .attr("x", (d) => xScale(d.x))
    .attr("y", (d) => yScale(d.y))
    .attr("width", d => xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .attr("fill", "green");
}

/**
 * Updates the batting chart using the hitter data provided.
 * @param {object} hitterData JSON object with season by season batting data
 * @param {object} weights wOBA weights
 */
function updateBattingChart(hitterData, weights) {
  let years = hitterData.map((season) => `'${season.yearID.toString().substring(2)}`);
  let totals = hitterData.map((season) => season.AB + season.BB - season.IBB + season.SF + season.HBP);
  let homerunRate = hitterData.map((season, i) => season.HR / totals[i] || 0);
  let tripleRate = hitterData.map((season, i) => (season["3B"] + season.HR) / totals[i] || 0);
  let doubleRate = hitterData.map((season, i) => (season["2B"] + season["3B"] + season.HR) / totals[i] || 0);
  let singleRate = hitterData.map((season, i) => (season.H) / totals[i] || 0);
  let hbpRate = hitterData.map((season, i) => (season.HBP + season.H) / totals[i] || 0);
  let walkRate = hitterData.map((season, i) => (season.BB - season.IBB + season.HBP + season.H) / totals[i] || 0);

  // Construct the scales and axes.
  let xScale = d3.scaleBand()
                  .domain(years)
                  .range([0, CHART_WIDTH - MARGIN.left - MARGIN.right])
                  .padding(.2);
  let xAxis = d3.axisBottom();
  xAxis.scale(xScale);
  let yScale = d3.scaleLinear()
                  .domain([0, d3.max(walkRate)])
                  .range([CHART_HEIGHT - MARGIN.top - MARGIN.bottom, 0])
                  .nice();
  let yAxis = d3.axisLeft();
  yAxis.scale(yScale);

  // Draw each of the axes to the chart.
  let battingDiv = d3.select("#modern-div");
  battingDiv.select(".x-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (CHART_HEIGHT - MARGIN.bottom) + ")")
    .call(xAxis);
  battingDiv.select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
    .call(yAxis);

  // Draw the rectangles for t
  let walksRect = battingDiv.select(".batting-chart").selectAll(".walk")
    .data(years.map((d, i) => {return {x: years[i], y: walkRate[i]}}))
    .join("rect")
      .classed("walk", true)
      .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["uBB"] / weights.hr) / 2)
      .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
      .attr("width", xScale.bandwidth() * weights["uBB"] / weights.hr)
      .attr("height", (d) => yScale(0) - yScale(d.y));

  let hbpRect = battingDiv.select(".batting-chart").selectAll(".hit-by-pitch")
    .data(years.map((d, i) => {return {x: years[i], y: hbpRate[i]}}))
    .join("rect")
      .classed("hit-by-pitch", true)
      .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["hbp"] / weights.hr) / 2)
      .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
      .attr("width", xScale.bandwidth() * weights["hbp"] / weights.hr)
      .attr("height", (d) => yScale(0) - yScale(d.y));

  let singlesRect = battingDiv.select(".batting-chart").selectAll(".single")
    .data(years.map((d, i) => {return {x: years[i], y: singleRate[i]}}))
    .join("rect")
      .classed("single", true)
      .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["1b"] / weights.hr) / 2)
      .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
      .attr("width", xScale.bandwidth() * weights["1b"] / weights.hr)
      .attr("height", (d) => yScale(0) - yScale(d.y));

  let doublesRect = battingDiv.select(".batting-chart").selectAll(".double")
    .data(years.map((d, i) => {return {x: years[i], y: doubleRate[i]}}))
    .join("rect")
      .classed("double", true)
      .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["2b"] / weights.hr) / 2)
      .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
      .attr("width", xScale.bandwidth() * weights["2b"] / weights.hr)
      .attr("height", (d) => yScale(0) - yScale(d.y));

  let triplesRect = battingDiv.select(".batting-chart").selectAll(".triple")
    .data(years.map((d, i) => {return {x: years[i], y: tripleRate[i]}}))
    .join("rect")
      .classed("triple", true)
      .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["3b"] / weights.hr) / 2)
      .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
      .attr("width", xScale.bandwidth() * weights["3b"] / weights.hr)
      .attr("height", (d) => yScale(0) - yScale(d.y));

  let homeRunRect = battingDiv.select(".batting-chart").selectAll(".home-run")
    .data(years.map((d, i) => {return {x: years[i], y: homerunRate[i]}}))
    .join("rect")
      .classed("home-run", true)
      .attr("x", (d) => MARGIN.left + xScale(d.x))
      .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.y));
}