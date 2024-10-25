// Constants for the charts, that would be useful.
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 400;
const MARGIN = { left: 50, bottom: 20, top: 20, right: 20 };
const ANIMATION_DUATION = 1000;

/**
 * Set up the website with proper DOM elements.
 */
export function setupWebsite() {
    let battingChart = d3.select("#batting-div").append("svg").style("width", CHART_WIDTH).style("height", CHART_HEIGHT);
    battingChart.append("g").classed("batting-chart", true);
    battingChart.append("g").classed("x-axis", true);
    battingChart.append("g").classed("y-axis", true);
}
  
/**
 * Updates the players select box with all teams.
 * @param {object[]} players player Info
 */
export function updatePlayerSelect(players) {
  const playerSelect = d3.select('#players');
  let addedValues = []
  players.forEach((f,i) => {
    let nameString = f.nameFirst + ' ' + f.nameLast
    if(!addedValues.includes(nameString)) {
      playerSelect.append("option").text(nameString).property("value", f.playerID).property("selected", i == 1);
      addedValues.push(nameString);
    }
  });
}

export function setupTable() {
  let tableHeaders = d3.select('#Table-div').append("thead").append("tr");
  const headers = ["playerID", "yearID", "teamID","G","AB","R","H","2B","3B","HR","RBI","SB","CS","BB","SO","IBB","HBP","SH","SF","GIDP"];
  tableHeaders.selectAll('th')
              .data(headers)
              .enter()
              .append('th')
              .text(function (header) { return header; })
}
/* Consulted ChatGpt on setting up this function */
export function updateTable(data) {
  d3.select("#Table-div").select("thead").remove();
  d3.select("#Table-div").select("tbody").remove();
  let tableHeaders = d3.select('#Table-div')
  tableHeaders.append("thead")
              .append("tr")
              .selectAll('th')
              .data(Object.keys(data[0]))
              .enter()
              .append('th')
              .text(d => d);
  let tableBody = tableHeaders.append('tbody')
                              .selectAll('tr')  
                              .data(data)
                              .enter()
                              .append('tr')  ; 
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
  updateBattingChart(hitterData, wobaWeights);
  // Update the player image
  updatePlayerImage();
}

/**
 * Updates the batting chart using the hitter data provided.
 * @param {object} hitterData JSON object with season by season batting data
 * @param {object} weights wOBA weights
 */
function updateBattingChart(hitterData, weights) {
  let years = hitterData.map((season) => `'${season.yearID.toString().substring(2)}`);
  let totals = hitterData.map((season) => season.AB + season.BB - season.IBB + season.SF + season.HBP);
  let homerunRate = hitterData.map((season, i) => season.HR / totals[i]);
  let tripleRate = hitterData.map((season, i) => (season["3B"] + season.HR) / totals[i]);
  let doubleRate = hitterData.map((season, i) => (season["2B"] + season["3B"] + season.HR) / totals[i]);
  let singleRate = hitterData.map((season, i) => (season.H) / totals[i]);
  let hbpRate = hitterData.map((season, i) => (season.HBP + season.H) / totals[i]);
  let walkRate = hitterData.map((season, i) => (season.BB - season.IBB + season.HBP + season.H) / totals[i]);

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
  let battingDiv = d3.select("#batting-div");
  battingDiv.select(".x-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (CHART_HEIGHT - MARGIN.top) + ")")
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

/**
* Updates the player image based on the given player name.
* @param {string} playerName
*/
function updatePlayerImage() {
  const sel = document.getElementById("players")
  const playerName = sel.options[sel.selectedIndex].text;
  const [firstName, lastName] = playerName.split(' ');
  const firstInitial = firstName.charAt(0).toUpperCase();
  const imageFolder = `FirstName${firstInitial}`;
  const imageName = `${firstName}_${lastName}.jpg`;

 
  const imageUrl = `http://localhost:8000/datasets/Card Images/${imageFolder}/${imageName}`;


  d3.select("#player-image")
      .attr("src", imageUrl)
      .attr("alt", playerName);
}
