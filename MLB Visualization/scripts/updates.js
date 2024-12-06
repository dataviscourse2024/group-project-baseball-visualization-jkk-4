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
  // Create the SVG with the small dimensions.
  let averagesChart = d3.select("#averages-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);

  // Append groups for each of the main components of the line chart.
  averagesChart.append("g").classed("avg-line-1", true);
  averagesChart.append("g").classed("avg-line-2", true);
  averagesChart.append("g").classed("avg-line-3", true);
  averagesChart.append("g").classed("line", true);
  averagesChart.append("g").classed("x-axis", true);
  averagesChart.append("g").classed("y-axis", true);
  averagesChart.append("g").classed("x-label", true)
    .append("text")
    .attr("x", SMALL_CHART_WIDTH / 2)
    .attr("y", SMALL_CHART_HEIGHT - MARGIN.bottom / 4)
    .attr("text-anchor", "middle")
    .text("Year");
  averagesChart.append("g").classed("y-label", true)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -SMALL_CHART_HEIGHT / 2)
    .attr("y", MARGIN.left / 3)
    .attr("text-anchor", "start")
    .text("Averages");
  averagesChart.append("g").classed("legend", true)
    .selectAll("rect")
    .data(["blue", "red", "green"])
    .join("rect")
    .attr("x", (d, i) => SMALL_CHART_WIDTH / 2 - 85 + 60 * i)
    .attr("y", MARGIN.top)
    .attr("width", 50)
    .attr("height", 10)
    .style("fill", (d) => d)
}
  
/**
 * Sets up the SVG for the season results pie chart.
 */
function setupResultsChart() {
  // Create the SVG with the small dimensions.
  let resultsChart = d3.select("#results-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);
    
  // Append groups for each of the main components of the pie chart.
  resultsChart.append("g").classed("title", true);
  resultsChart.append("g").classed("slice-paths", true);
  resultsChart.append("g").classed("slice-texts", true);
}

/**
 * Sets up the SVG with labels for the stats bar chart.
 */
function setupStatsChart() {
  // Create the SVG with the small dimensions.
  let statsChart = d3.select("#stat-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);
  
  // Append groups for each of the main components of the bar chart.
  statsChart.append("g").classed("stats-chart", true);
  statsChart.append("g").classed("x-axis", true);
  statsChart.append("g").classed("y-axis", true);
  statsChart.append("g").classed("y-label", true);
  statsChart.append("g").classed("x-label", true)
    .append("text")
    .attr("x", SMALL_CHART_WIDTH / 2)
    .attr("y", SMALL_CHART_HEIGHT - MARGIN.bottom / 4)
    .attr("text-anchor", "middle")
    .text("Year");
}

/**
 * Sets up the SVG for the modern chart having the WOBA or FIP towers.
 */
function setupModernChart() {
  // Create the SVG with the normal dimensions.
  let modernChart = d3.select("#modern-div").append("svg").style("width", CHART_WIDTH).style("height", CHART_HEIGHT);

  // Append groups for each of the main components of the bar chart.
  modernChart.append("g").classed("modern-chart", true);
  modernChart.append("g").classed("x-axis", true);
  modernChart.append("g").classed("y-axis", true);
  modernChart.append("g").classed("x-label", true)
    .append("text")
    .attr("x", CHART_WIDTH / 2)
    .attr("y", CHART_HEIGHT - MARGIN.bottom / 4)
    .attr("text-anchor", "middle")
    .text("Year");
  modernChart.append("g").classed("y-label", true)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -CHART_HEIGHT / 2)
    .attr("y", MARGIN.left / 4)
    .attr("text-anchor", "middle")
    .text("Percentage of Plate Appearances");
  modernChart.append("g").classed("title", true);
  modernChart.append("g").classed("legend", true);
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

export function updateTable(data) {
  d3.select("#Table-div").select("tbody").remove();
  d3.select("#Table-div").select("thead").remove();
  let tableHeaders = d3.select('#Table-div');
  let headers = []
  if (data.length == 0) {
    headers = ["No Data Found for chosen player/stats"]
    tableHeaders.append("thead")
                .append("tr")
                .selectAll('th')
                .data(headers)
                .enter()
                .append('th')
                .text(function (header) { return header; })
  }
  else {
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
}

/**
 * Updates the visualizations based on the given data.
 * Updates the bar chart using the x and y data provided.
 * @param {string} xData categorical independent variable
 * @param {number} yData dependent variable
 * @param data 
 * @param playerName
 */
export function updateWebsite(playerData, wobaWeights) {

  if (playerData.length != 0) {
    showVisualizations();

    let modernChart = d3.select("#modern-div");
    modernChart.selectAll(".title")
               .selectAll("text")
               .attr("x", CHART_WIDTH / 2)
               .attr("y", MARGIN.top)
               .attr("text-anchor", "middle")
               .style("font-size", 18)
               .text("Runs Created");
    const year = parseInt(playerData[0].yearID);
    const dataIsBatting = d3.select('#player-type').node().value === "Batting";
    let selectedStat = dataIsBatting ? "Homers" : "Strikeouts";

    updateAveragesChart(playerData, year, selectedStat, dataIsBatting);
    updateResultsChart(playerData, year, selectedStat, dataIsBatting);
    updateStatsChart(playerData, year, selectedStat, dataIsBatting);
    updateModernChart(playerData, wobaWeights, dataIsBatting);
  }
  else {    
    hideVisualizations();

    let svg = d3.select("#results-div").select("svg");
    svg.select(".title").selectAll("text")
        .data(["No rate statistic tables due to missing data",
          "for chosen player/position combination"])
        .join("text")
        .attr("x", SMALL_CHART_WIDTH / 2)
        .attr("y", (d, i) => SMALL_CHART_HEIGHT / 2 - 10 + i * 20)
        .style('font-weight','bold')
        .attr("text-anchor", "middle")
        .text((d) => d);

    let modernChart = d3.select("#modern-div");
    modernChart.selectAll(".title")
               .selectAll("text")
               .attr("x", CHART_WIDTH / 2)
               .attr("y", MARGIN.top)
               .attr("text-anchor", "middle")
               .style('font-weight','bold')
               .text("No modern statistic tables due to missing data for chosen player/position combination");    
  }
  // Update the player image
  updatePlayerImage();
}

/**
 * Shows the visualizations when there is data for a player.
 */
function showVisualizations() {
  d3.select("#averages-div").style("display", "block");
  d3.select("#results-div").select(".slice-paths").style("display", "block");
  d3.select("#results-div").select(".slice-texts").style("display", "block");
  d3.select("#stat-div").style("display", "block");

  d3.select("#modern-div").select(".modern-chart").style("display", "block");
  d3.select("#modern-div").select(".x-axis").style("display", "block");
  d3.select("#modern-div").select(".y-axis").style("display", "block");
  d3.select("#modern-div").select(".x-label").style("display", "block");
  d3.select("#modern-div").select(".y-label").style("display", "block");
  d3.select("#modern-div").select(".legend").style("display", "block");
}

/**
 * Hides the visualizations when there is no data for a player.
 */
function hideVisualizations() {
  d3.select("#averages-div").style("display", "none");
  d3.select("#stat-div").style("display", "none");
  d3.select("#results-div").select(".slice-texts").style("display", "none");
  d3.select("#results-div").select(".slice-paths").style("display", "none");

  d3.select("#modern-div").select(".modern-chart").style("display", "none");
  d3.select("#modern-div").select(".x-axis").style("display", "none");
  d3.select("#modern-div").select(".y-axis").style("display", "none");
  d3.select("#modern-div").select(".x-label").style("display", "none");
  d3.select("#modern-div").select(".y-label").style("display", "none");
  d3.select("#modern-div").select(".legend").style("display", "none");
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

/**
 * Updates the visualization that displays averages of popular statistics.
 * @param {*} playerData hitting or pitching data
 * @param {*} selectedYear the selected year to highlight numbers for
 * @param {*} selectedStat selected statistic of results chart
 * @param {*} dataIsBatting true if the playerData is for hitting, false if it for pitching
 */
function updateAveragesChart(playerData, selectedYear, selectedStat, dataIsBatting) {

  let averagesChart = d3.select("#averages-div").select("svg");

  // Add the labels to the legend.
  averagesChart.select(".legend")
    .selectAll("text")
    .data(dataIsBatting ? ["BAA", "OBP", "SLG"] : ["ERA", "BB/9", "K/9"])
    .join("text")
    .attr("text-anchor", "middle")
    .attr("transform", (d, i) => "translate(" + (SMALL_CHART_WIDTH / 2 - 60 + 60 * i) + ", " + (3 * MARGIN.top / 4) + ")")
    .text((d) => d)

  // Retrieve the data for the correct visualization.
  let years = playerData.map((season) => new Date(parseInt(season.yearID), 0));
  let line1Avgs, line2Avgs, line3Avgs;
  if (dataIsBatting) {
    line1Avgs = playerData.map((season) => season.H / season.AB || 0); // BAA
    line2Avgs = playerData.map((season) => (season.H + season.BB + season.HBP) / (season.AB + season.BB + season.HBP + season.SF) || 0); // OBP
    line3Avgs = playerData.map((season) => (season.H + season["2B"] + 2*season["3B"] + 3*season.HR) / season.AB || 0); // SLG
  }
  else {
    line1Avgs = playerData.map((season) => season.ER / season.IPouts * 27 || 0); // ERA
    line2Avgs = playerData.map((season) => season.BB / season.IPouts * 27 || 0); // BB/9
    line3Avgs = playerData.map((season) => season.SO / season.IPouts * 27 || 0); // K/9
  }

  // Create the scales for the data.
  let xScale = d3.scaleTime()
                  .domain([d3.min(years), d3.max(years)])
                  .range([0, SMALL_CHART_WIDTH - MARGIN.left - MARGIN.right]);
  let numTicks = d3.max(years).getFullYear() - d3.min(years).getFullYear() + 1;
  let xAxis = d3.axisBottom()
    .ticks(numTicks).tickFormat(d3.timeFormat('\'%y'));
  xAxis.scale(xScale);
  let yScale = d3.scaleLinear()
                  .domain(dataIsBatting ? [0, 1] : [0, 15])
                  .range([SMALL_CHART_HEIGHT - MARGIN.top - MARGIN.bottom, 0])
                  .nice();
  let yAxis = d3.axisLeft();
  yAxis.scale(yScale);

  // Draw the axes.
  d3.select("#averages-div").select(".x-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (SMALL_CHART_HEIGHT - MARGIN.bottom) + ")")
    .call(xAxis);
  d3.select("#averages-div").select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
    .call(yAxis);

  // Draw the lines of the chart.
  let lineGenerator = d3.line()
    .x((d) => MARGIN.left + xScale(d.x))
    .y((d) => SMALL_CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y));
  let line1Data = years.map((year, index) => {return {x: years[index], y: line1Avgs[index]}});
  d3.select(".avg-line-1").selectAll("path")
    .data([line1Data])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "blue")
    .style("stroke-width", 4);
  d3.select(".avg-line-1").selectAll("circle")
    .data(line1Data)
    .join("circle")
    .attr("cx", (d) => MARGIN.left + xScale(d.x))
    .attr("cy", (d) => MARGIN.top + yScale(d.y))
    .attr("r", 4)
    .style("fill", "blue")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateResultsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateStatsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
    });
  let line2Data = years.map((year, index) => {return {x: years[index], y: line2Avgs[index]}});
  d3.select(".avg-line-2").selectAll("path")
    .data([line2Data])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "red")
    .style("stroke-width", 4);
  d3.select(".avg-line-2").selectAll("circle")
    .data(line2Data)
    .join("circle")
    .attr("cx", (d) => MARGIN.left + xScale(d.x))
    .attr("cy", (d) => MARGIN.top + yScale(d.y))
    .attr("r", 4)
    .style("fill", "red")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateResultsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateStatsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
    });
  let line3Data = years.map((year, index) => {return {x: years[index], y: line3Avgs[index]}});
  d3.select(".avg-line-3").selectAll("path")
    .data([line3Data])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "green")
    .style("stroke-width", 4);
  d3.select(".avg-line-3").selectAll("circle")
    .data(line3Data)
    .join("circle")
    .attr("cx", (d) => MARGIN.left + xScale(d.x))
    .attr("cy", (d) => MARGIN.top + yScale(d.y))
    .attr("r", 4)
    .style("fill", "green")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateResultsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateStatsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
    });

  // Draw the line with labels of the stats.
  if (selectedYear) {
    let line = d3.select(".line")
    line.selectAll("line")
      .data([0])
      .join("line")
      .attr("x1", (d) => MARGIN.left + xScale(new Date(selectedYear, 0)))
      .attr("y1", MARGIN.top + 30)
      .attr("x2", (d) => MARGIN.left + xScale(new Date(selectedYear, 0)))
      .attr("y2", SMALL_CHART_HEIGHT - MARGIN.bottom)
      .style("stroke", "gray")
      .style("stroke-width", 2);
    const yearIndex = line1Data.findIndex((d) => d.x.getFullYear() === selectedYear);
    line.selectAll("text")
      .data([(dataIsBatting ? "AVG" : "ERA") + " = " + (dataIsBatting ? line1Data[yearIndex].y.toFixed(3) : line1Data[yearIndex].y.toPrecision(3)),
        (dataIsBatting ? "OBP" : "BB/9") + " = " + (dataIsBatting ? line2Data[yearIndex].y.toFixed(3) : line2Data[yearIndex].y.toPrecision(3)),
        (dataIsBatting ? "SLG" : "K/9") + " = " + (dataIsBatting ? line3Data[yearIndex].y.toFixed(3) : line3Data[yearIndex].y.toPrecision(3))
      ])
      .join("text")
      .text((d) => d)
      .attr("transform", "translate(" + (MARGIN.left + xScale(new Date(selectedYear, 0))) + "," + (MARGIN.top + 30) + ")")
      .attr("dx", yearIndex < line1Data.length / 2 ? 10 : -10)
      .attr("dy", (d, i) => 15 * i)
      .style("text-anchor", yearIndex < line1Data.length / 2 ? "start" : "end")
      .style("font-size", "10px")
      .style("stroke", (d, i) => i == 0 ? "blue" : (i == 1 ? "red" : "green"));
  }
}

/**
 * Updates the visualization that displays a pie chart of plate appearance results for the selected season.
 * @param {*} playerData hitting or pitching data
 * @param {*} selectedYear the selected year to highlight numbers for
 * @param {*} selectedStat selected statistic of results chart
 * @param {*} dataIsBatting true if the playerData is for hitting, false if it for pitching
 */
function updateResultsChart(playerData, selectedYear, selectedStat, dataIsBatting) {

  // Update the title with the selected year.
  let resultsChart = d3.select("#results-div").select("svg");
  resultsChart.selectAll(".title").selectAll("text")
    .data([0])
    .join("text")
    .attr("x", SMALL_CHART_WIDTH / 2)
    .attr("y", 2 * MARGIN.top / 3)
    .attr("text-anchor", "middle")
    .style('font-weight','bold')
    .text("Plate Appearance Results for " + selectedYear);

  // Retrieve data to fill the pie chart.
  let seasonData = playerData.find((season) => parseInt(season.yearID) === selectedYear);
  let data;
  if (dataIsBatting) {
    if (seasonData.AB + seasonData.BB + seasonData.HBP + seasonData.SF > 0) {
      data = [{stat: "GIDPs", amount: seasonData.GIDP},
        {stat: "Strikeouts", amount: seasonData.SO},
        {stat: "Ball in Play Outs", amount: seasonData.AB - seasonData.H - seasonData.SO - seasonData.GIDP},
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
  }
  else {
    if (seasonData.IPouts + seasonData.H + seasonData.BB + seasonData.HBP > 0) {
      data = [{stat: "Homers", amount: seasonData.HR},
        {stat: "Base Hits", amount: seasonData.H - seasonData.HR},
        {stat: "HBPs", amount: seasonData.HBP},
        {stat: "Walks", amount: seasonData.BB},
        {stat: "Sacrifices", amount: seasonData.SH + seasonData.SF},
        {stat: "Ball in Play Outs", amount: seasonData.IPouts - seasonData.SH - seasonData.SF - seasonData.SO},
        {stat: "Strikeouts", amount: seasonData.SO}, 
        {stat: "GIDPs", amount: seasonData.GIDP}];
    }
    else {
      data = [{stat: "No Batting Data this season", amount: 1}];
    }
  }

  // Create the color scale and pie chart data.
  let color = d3.scaleOrdinal(d3.schemeRdBu[dataIsBatting ? 10 : 8]);
  let pie = d3.pie()
    .value((d) => d.amount)
    .padAngle(0.02);
  let pieData = pie(data);
  let arc = d3.arc()
    .outerRadius(125)
    .innerRadius(0);

  // Create the actual pie slices and the accompanying text.
  resultsChart.select(".slice-paths").selectAll("path")
    .data(pieData)
    .join("path")
    .attr("transform", "translate(" + SMALL_CHART_WIDTH / 2 + "," + SMALL_CHART_HEIGHT / 2 + ")")
    .attr("d", arc)
    .style("fill", d => color(d.data.stat))
    .style("stroke", (d) => d.data.stat === selectedStat ? "black" : color(d.data.stat))
    .style("stroke-width", (d) => d.data.stat === selectedStat ? 4 : 1)
    .classed("hover-cursor", true)
    .on("click", (event, d) => {
      updateAveragesChart(playerData, selectedYear, d.data.stat, dataIsBatting);
      updateResultsChart(playerData, selectedYear, d.data.stat, dataIsBatting);
      updateStatsChart(playerData, selectedYear, d.data.stat, dataIsBatting);
  });
  resultsChart.select(".slice-texts").selectAll("text")
    .data(pieData)
    .join("text")
    .text(d => d.data.stat)
    .attr("transform", (d) => "translate(" + SMALL_CHART_WIDTH / 2 + "," + SMALL_CHART_HEIGHT / 2 + ") translate(" + arc.centroid(d) + ")")
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style("font-size", "10px");
}

/**
 * Updates the visualization that displays bars for the selected statistic.
 * @param {*} playerData hitting or pitching data
 * @param {*} selectedYear the selected year to highlight numbers for
 * @param {*} selectedStat selected statistic of results chart
 * @param {*} dataIsBatting true if the playerData is for hitting, false if it for pitching
 */
function updateStatsChart(playerData, selectedYear, selectedStat, dataIsBatting) {

  // Update the y-axis label with the proper label.
  let statsChart = d3.select("#stat-div").select("svg");
  statsChart.select(".y-label").selectAll("text")
    .data([selectedStat])
    .join("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -SMALL_CHART_HEIGHT / 2 + 20)
    .attr("y", MARGIN.left / 3)
    .attr("text-anchor", "middle")
    .text((d) => d);

  // Retrieve the data for the given statistic.
  let years = playerData.map((season) => new Date(parseInt(season.yearID), 0));
  let stats;
  if (selectedStat === "GIDPs") {
    stats = playerData.map((season) => season.GIDP);
  } else if (selectedStat === "Strikeouts") {
    stats = playerData.map((season) => season.SO);
  } else if (selectedStat === "Ball in Play Outs") {
    if (dataIsBatting)
      stats = playerData.map((season) => season.AB - season.H - season.SO - season.GIDP);
    else 
      stats = playerData.map((season) => season.IPouts - season.SH - season.SF - season.SO);
  } else if (selectedStat === "Sacrifices") {
    stats = playerData.map((season) => season.SF + season.SH);
  } else if (selectedStat === "HBPs") {
    stats = playerData.map((season) => season.HBP);
  } else if (selectedStat === "Walks") {
    stats = playerData.map((season) => season.BB);
  } else if (selectedStat === "Singles") {
    stats = playerData.map((season) => season.H - season["2B"] - season["3B"] - season.HR);
  } else if (selectedStat === "Doubles") {
    stats = playerData.map((season) => season["2B"]);
  } else if (selectedStat === "Triples") {
    stats = playerData.map((season) => season["3B"]);
  } else if (selectedStat === "Homers") {
    stats = playerData.map((season) => season.HR);
  } else if (selectedStat === "Base Hits") {
    stats = playerData.map((season) => season.H - season.HR);
  }

  // Create the scales for the axis.
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

  // Create the axes.
  statsChart.select(".x-axis")
    .attr("transform", "translate(0," + (SMALL_CHART_HEIGHT - MARGIN.bottom) + ")")
    .call(xAxis);
  statsChart.select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + ",0)")
    .call(yAxis);

  // Create the bars.
  const statData = years.map((year, index) => {return {x: years[index], y: stats[index]}});
  statsChart.selectAll("rect")
    .data(statData)
    .join("rect")
    .attr("x", (d) => xScale(d.x))
    .attr("y", (d) => yScale(d.y))
    .attr("width", d => xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .attr("fill", (d) => d.x.getFullYear() === selectedYear ? "orange" : "green")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateResultsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
      updateStatsChart(playerData, d.x.getFullYear(), selectedStat, dataIsBatting);
    });
}

/**
 * Updates the batting chart using the hitter data provided.
 * @param {object} playerData JSON object with season by season batting data
 * @param {object} weights wOBA weights
 * @param {*} dataIsBatting true if the playerData is for hitting, false if it for pitching
 */
function updateModernChart(playerData, weights, dataIsBatting) {

  // Create the title for the modern chart.
  let modernChart = d3.select("#modern-div").select("svg");
  modernChart.select(".title")
    .selectAll("text")
    .data([0])
    .join("text")
    .attr("x", CHART_WIDTH / 2)
    .attr("y", MARGIN.top)
    .attr("text-anchor", "middle")
    .style('font-weight','bold')
    .style("font-size", 18)
    .text(dataIsBatting ? "Expected Runs Created" : "Expected Runs Allowed");
  
  // Create the color scale for the data.
  let colorScale = d3.scaleOrdinal(d3.schemeYlOrBr[9]);
  let colors = [];
  for (let i = 0; i < 9; i++) {
    let c = colorScale(i);
    if (i >= (dataIsBatting ? 3 : 5))
      colors.push(c);
  }
  
  // Create the legend for the modern chart.
  let legendData = dataIsBatting ? ["Walks", "Hit By Pitches", "Singles", "Doubles", "Triples", "Home Runs"] : ["Strikeouts", "Walks", "Hit By Pitches", "Home Runs"];
  modernChart.select(".legend")
    .selectAll("rect")
    .data(legendData)
    .join("rect")
    .attr("x", (d, i) => MARGIN.left + 20 + i * 150)
    .attr("y", MARGIN.top + 20)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", (d, i) => colors[i]);
  modernChart.select(".legend")
    .selectAll("text")
    .data(legendData)
    .join("text")
    .attr("x", (d, i) => MARGIN.left + 50 + i * 150)
    .attr("y", MARGIN.top + 35)
    .attr("text-anchor", "start")
    .text((d) => d);

  // Retrieve data for the chart.
  if (!dataIsBatting)
    weights = {"hr": 13, "uBB": 3, "hbp": 3, "k": 2}
  let years = playerData.map((season) => `'${season.yearID.toString().substring(2)}`);
  let totals, walks, walkRate, hbps, hbpRate;
  let homers, homerunRate, triples, tripleRate, doubles, doubleRate, singles, singleRate;
  let strikeouts, strikeoutRate;
  walks = playerData.map((season) => season.BB - season.IBB);
  hbps = playerData.map((season) => season.HBP);
  if (dataIsBatting) {
    totals = playerData.map((season) => season.AB + season.BB - season.IBB + season.SF + season.HBP);
    homers = playerData.map((season) => season.HR);
    homerunRate = playerData.map((season, i) => season.HR / totals[i] || 0);
    triples = playerData.map((season) => season["3B"]);  
    tripleRate = playerData.map((season, i) => (season["3B"] + season.HR) / totals[i] || 0);
    doubles = playerData.map((season) => season["2B"]);
    doubleRate = playerData.map((season, i) => (season["2B"] + season["3B"] + season.HR) / totals[i] || 0);
    singles = playerData.map((season) => season.H - season["2B"] - season["3B"] - season.HR);
    singleRate = playerData.map((season, i) => (season.H) / totals[i] || 0);
    walkRate = playerData.map((season, i) => (season.BB - season.IBB + season.HBP + season.H) / totals[i] || 0);
    hbpRate = playerData.map((season, i) => (season.HBP + season.H) / totals[i] || 0);
  }
  else {
    totals = playerData.map((season) => season.BFP);
    homers = playerData.map((season) => season.HR);
    homerunRate = playerData.map((season, i) => season.HR / totals[i] || 0);
    walkRate = playerData.map((season, i) => (season.BB - season.IBB + season.HBP + season.HR) / totals[i] || 0);
    hbpRate = playerData.map((season, i) => (season.HBP + season.HR) / totals[i] || 0);
    strikeouts = playerData.map((season) => season.SO);
    strikeoutRate = playerData.map((season, i) => season.SO / totals[i] || 0);
  }
  
  // Construct the scales and axes.
  let xScale = d3.scaleBand()
                  .domain(years)
                  .range([0, CHART_WIDTH - MARGIN.left - MARGIN.right])
                  .padding(.2);
  let xAxis = d3.axisBottom();
  xAxis.scale(xScale);
  let yScale = d3.scaleLinear()
                  .domain(dataIsBatting ? [0, 0.6] : [-0.4, 0.4])
                  .range([CHART_HEIGHT - MARGIN.top - MARGIN.bottom, 0])
                  .nice();
  let yAxis = d3.axisLeft();
  yAxis.scale(yScale);

  // Draw each of the axes to the chart.
  modernChart.select(".x-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top + yScale(0)) + ")")
    .call(xAxis);
  modernChart.select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
    .call(yAxis);

  // Remove existing rectangles before adding the new ones.
  modernChart.select(".modern-chart").selectAll("rect").remove();

  // Draw the rectangles for the visualization.
  modernChart.select(".modern-chart").selectAll(".walk")
    .data(years.map((d, i) => {return {x: years[i], y: walkRate[i], amount: walks[i], weight: weights["uBB"]}}))
    .join("rect")
    .classed("walk", true)
    .style("fill", dataIsBatting ? colors[0] : colors[1])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["uBB"] / weights.hr) / 2)
    .attr("y", (d) => MARGIN.top + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["uBB"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => dataIsBatting ? 
      `<title>${d.amount} Unintentional Walks x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`
      : `<title>${d.amount} Unintentional Walks x ${d.weight} Expected Runs Allowed Each = ${(d.amount * d.weight).toFixed(2)} Expected Runs Allowed</title>`);
  
  modernChart.select(".modern-chart").selectAll(".hit-by-pitch")
    .data(years.map((d, i) => {return {x: years[i], y: hbpRate[i], amount: hbps[i], weight: weights["hbp"]}}))
    .join("rect")
    .classed("hit-by-pitch", true)
    .style("fill", dataIsBatting ? colors[1] : colors[2])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["hbp"] / weights.hr) / 2)
    .attr("y", (d) => MARGIN.top + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["hbp"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => dataIsBatting ?
      `<title>${d.amount} Hit By Pitches x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`
      : `<title>${d.amount} Hit By Pitches x ${d.weight} Expected Runs Allowed Each = ${(d.amount * d.weight).toFixed(2)} Expected Runs Allowed</title>`);

  modernChart.select(".modern-chart").selectAll(".single")
    .data(dataIsBatting ? years.map((d, i) => {return {x: years[i], y: singleRate[i], amount: singles[i], weight: weights["1b"]}}) : [])
    .join("rect")
    .classed("single", true)
    .style("fill", colors[2])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["1b"] / weights.hr) / 2)
    .attr("y", (d) => MARGIN.top + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["1b"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Singles x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  modernChart.select(".modern-chart").selectAll(".double")
    .data(dataIsBatting ? years.map((d, i) => {return {x: years[i], y: doubleRate[i], amount: doubles[i], weight: weights["2b"]}}) : [])
    .join("rect")
    .classed("double", true)
    .style("fill", colors[3])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["2b"] / weights.hr) / 2)
    .attr("y", (d) => MARGIN.top + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["2b"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Doubles x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  modernChart.select(".modern-chart").selectAll(".triple")
    .data(dataIsBatting ? years.map((d, i) => {return {x: years[i], y: tripleRate[i], amount: triples[i], weight: weights["3b"]}}) : [])
    .join("rect")
    .classed("triple", true)
    .style("fill", colors[4])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["3b"] / weights.hr) / 2)
    .attr("y", (d) => MARGIN.top + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["3b"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Triples x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  modernChart.select(".modern-chart").selectAll(".home-run")
    .data(years.map((d, i) => {return {x: years[i], y: homerunRate[i], amount: homers[i], weight: weights["hr"]}}))
    .join("rect")
    .classed("home-run", true)
    .style("fill", dataIsBatting ? colors[5] : colors[3])
    .attr("x", (d) => MARGIN.left + xScale(d.x))
    .attr("y", (d) => MARGIN.top + yScale(d.y))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => dataIsBatting ? 
      `<title>${d.amount} Home Runs x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`
      : `<title>${d.amount} Home Runs x ${d.weight} Expected Runs Allowed Each = ${(d.amount * d.weight).toFixed(2)} Expected Runs Allowed</title>`);

  modernChart.select(".modern-chart").selectAll(".strikeout")
    .data(dataIsBatting ? [] : years.map((d, i) => {return {x: years[i], y: strikeoutRate[i], amount: strikeouts[i], weight: weights["k"]}}))
    .join("rect")
    .classed("strikeout", true)
    .style("fill", colors[0])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["k"] / weights.hr) / 2)
    .attr("y", (d) => MARGIN.top + yScale(0))
    .attr("width", xScale.bandwidth() * weights["k"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Strikeouts x ${d.weight} Expected Runs Saved Each = ${(d.amount * d.weight).toFixed(2)} Expected Runs Saved</title>`);
}