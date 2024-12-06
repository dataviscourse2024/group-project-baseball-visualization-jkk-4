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
  averagesChart.append("g").classed("line", true);
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
  let resultsChart = d3.select("#results-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);
  resultsChart.append("g").classed("title", true);
  resultsChart.append("g").classed("slice-paths", true);
  resultsChart.append("g").classed("slice-texts", true);
}

/**
 * Sets up the SVG with labels for the stats bar chart.
 */
function setupStatsChart() {
  let statsChart = d3.select("#stat-div").append("svg").style("width", SMALL_CHART_WIDTH).style("height", SMALL_CHART_HEIGHT);
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
  let modernChart = d3.select("#modern-div").append("svg").style("width", CHART_WIDTH).style("height", CHART_HEIGHT);
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
  modernChart.append("g").classed("title", true)
    .append("text")
    .attr("x", CHART_WIDTH / 2)
    .attr("y", MARGIN.top)
    .attr("text-anchor", "middle")
    .style('font-weight','bold')
    .style("font-size", 18)
    .text("Runs Created");

  let colorScale = d3.scaleOrdinal(d3.schemeYlOrBr[9]);
  let colors = [];
  for (let i = 0; i < 9; i++) {
    let c = colorScale(i);
    if (i >= 3)
      colors.push(c);
  }
  let legendData = ["Walks", "Hit By Pitches", "Singles", "Doubles", "Triples", "Home Runs"];
  let legend = modernChart.append("g").classed("legend", true);
  legend.selectAll("rect")
    .data(legendData)
    .join("rect")
    .attr("x", (d, i) => MARGIN.left + 20 + i * 150)
    .attr("y", MARGIN.top + 20)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", (d, i) => colors[i]);
  legend.selectAll("text")
    .data(legendData)
    .join("text")
    .attr("x", (d, i) => MARGIN.left + 50 + i * 150)
    .attr("y", MARGIN.top + 35)
    .attr("text-anchor", "start")
    .text((d) => d);
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
export function updateWebsite(hitterData, wobaWeights) {

  if (hitterData.length != 0) {
    showVisualizations();

    let modernChart = d3.select("#modern-div");
    modernChart.selectAll(".title")
               .selectAll("text")
               .attr("x", CHART_WIDTH / 2)
               .attr("y", MARGIN.top)
               .attr("text-anchor", "middle")
               .style("font-size", 18)
               .text("Runs Created");
    const year = parseInt(hitterData[0].yearID);
    updateAveragesChart(hitterData, year, "Homers");
    updateResultsChart(hitterData, year, "Homers");
    updateStatsChart(hitterData, year, "Homers");
    updateModernChart(hitterData, wobaWeights);
    // Update the player image
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
  d3.select("#stat-div").style("display", "none");

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

function updateAveragesChart(hitterData, selectedYear, selectedStat) {
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
  d3.select(".avg-line").selectAll("circle")
    .data(avgData)
    .join("circle")
    .attr("cx", (d) => MARGIN.left + xScale(d.x))
    .attr("cy", (d) => MARGIN.top + yScale(d.y))
    .attr("r", 4)
    .style("fill", "blue")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(hitterData, d.x.getFullYear(), selectedStat);
      updateResultsChart(hitterData, d.x.getFullYear(), selectedStat);
      updateStatsChart(hitterData, d.x.getFullYear(), selectedStat);
    });
  let obpData = years.map((year, index) => {return {x: years[index], y: onBaseAvgs[index]}});
  d3.select(".obp-line").selectAll("path")
    .data([obpData])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "red")
    .style("stroke-width", 4);
  d3.select(".obp-line").selectAll("circle")
    .data(obpData)
    .join("circle")
    .attr("cx", (d) => MARGIN.left + xScale(d.x))
    .attr("cy", (d) => MARGIN.top + yScale(d.y))
    .attr("r", 4)
    .style("fill", "red")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(hitterData, d.x.getFullYear(), selectedStat);
      updateResultsChart(hitterData, d.x.getFullYear(), selectedStat);
      updateStatsChart(hitterData, d.x.getFullYear(), selectedStat);
    });
  let slgData = years.map((year, index) => {return {x: years[index], y: sluggingAvgs[index]}});
  d3.select(".slg-line").selectAll("path")
    .data([slgData])
    .join("path")
    .attr("d", lineGenerator)
    .style("fill", "none")
    .style("stroke", "green")
    .style("stroke-width", 4);
  d3.select(".slg-line").selectAll("circle")
    .data(slgData)
    .join("circle")
    .attr("cx", (d) => MARGIN.left + xScale(d.x))
    .attr("cy", (d) => MARGIN.top + yScale(d.y))
    .attr("r", 4)
    .style("fill", "green")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(hitterData, d.x.getFullYear(), selectedStat);
      updateResultsChart(hitterData, d.x.getFullYear(), selectedStat);
      updateStatsChart(hitterData, d.x.getFullYear(), selectedStat);
    });

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
    const yearIndex = avgData.findIndex((d) => d.x.getFullYear() === selectedYear);
    line.selectAll("text")
      .data(["AVG = " + avgData[yearIndex].y.toFixed(3),
        "OBP = " + obpData[yearIndex].y.toFixed(3),
        "SLG = " + slgData[yearIndex].y.toFixed(3)
      ])
      .join("text")
      .text((d) => d)
      .attr("transform", "translate(" + (MARGIN.left + xScale(new Date(selectedYear, 0))) + "," + (MARGIN.top + 30) + ")")
      .attr("dx", yearIndex < avgData.length / 2 ? 10 : -10)
      .attr("dy", (d, i) => 15 * i)
      .style("text-anchor", yearIndex < avgData.length / 2 ? "start" : "end")
      .style("font-size", "10px")
      .style("stroke", (d, i) => i == 0 ? "blue" : (i == 1 ? "red" : "green"));
  }
}

function updateResultsChart(hitterData, selectedYear, selectedStat) {
  let seasonData = hitterData.find((season) => parseInt(season.yearID) === selectedYear);
  let data;
  if (seasonData.AB + seasonData.BB + seasonData.HBP + seasonData.SF > 0) {
    data = [{stat: "GIDPs", amount: seasonData.GIDP},
      {stat: "Ks", amount: seasonData.SO},
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
  
  let svg = d3.select("#results-div").select("svg");
  svg.selectAll(".title").selectAll("text")
    .data([0])
    .join("text")
    .attr("x", SMALL_CHART_WIDTH / 2)
    .attr("y", 2 * MARGIN.top / 3)
    .attr("text-anchor", "middle")
    .style('font-weight','bold')
    .text("Plate Appearance Results for " + selectedYear);

  let color = d3.scaleOrdinal(d3.schemeRdBu[10]);

  let pie = d3.pie();
  pie.value(function (d) {
      return d.amount;
  });
  pie.padAngle(0.02);
  let pieData = pie(data);
  let arc = d3.arc();
  arc.outerRadius(125);
  arc.innerRadius(0);

  svg.select(".slice-paths").selectAll("path")
    .data(pieData)
    .join("path")
    .attr("transform", "translate(" + SMALL_CHART_WIDTH / 2 + "," + SMALL_CHART_HEIGHT / 2 + ")")
    .attr("d", arc)
    .style("fill", d => color(d.data.stat))
    .style("stroke", (d) => d.data.stat === selectedStat ? "black" : color(d.data.stat))
    .style("stroke-width", (d) => d.data.stat === selectedStat ? 4 : 1)
    .classed("hover-cursor", true)
    .on("click", (event, d) => {
      updateAveragesChart(hitterData, selectedYear, d.data.stat);
      updateResultsChart(hitterData, selectedYear, d.data.stat);
      updateStatsChart(hitterData, selectedYear, d.data.stat);
  });
  svg.select(".slice-texts").selectAll("text")
    .data(pieData)
    .join("text")
    .text(d => d.data.stat)
    .attr("transform", (d) => "translate(" + SMALL_CHART_WIDTH / 2 + "," + SMALL_CHART_HEIGHT / 2 + ") translate(" + arc.centroid(d) + ")")
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style("font-size", "10px");
}

function updateStatsChart(hitterData, selectedYear, selectedStat) {

  let years = hitterData.map((season) => new Date(parseInt(season.yearID), 0));
  let stats;
  if (selectedStat === "GIDPs") {
    stats = hitterData.map((season) => season.GIDP);
  } else if (selectedStat === "Ks") {
    stats = hitterData.map((season) => season.SO);
  } else if (selectedStat === "Ball in Play Outs") {
    stats = hitterData.map((season) => season.AB - season.H - season.SO - season.GIDP);
  } else if (selectedStat === "Sacrifices") {
    stats = hitterData.map((season) => season.SF + season.SH);
  } else if (selectedStat === "HBPs") {
    stats = hitterData.map((season) => season.HBP);
  } else if (selectedStat === "Walks") {
    stats = hitterData.map((season) => season.BB);
  } else if (selectedStat === "Singles") {
    stats = hitterData.map((season) => season.H - season["2B"] - season["3B"] - season.HR);
  } else if (selectedStat === "Doubles") {
    stats = hitterData.map((season) => season["2B"]);
  } else if (selectedStat === "Triples") {
    stats = hitterData.map((season) => season["3B"]);
  } else if (selectedStat === "Homers") {
    stats = hitterData.map((season) => season.HR);
  }

  d3.select("#stat-div").select(".y-label").selectAll("text")
    .data([selectedStat])
    .join("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -SMALL_CHART_HEIGHT / 2 + 20)
    .attr("y", MARGIN.left / 3)
    .attr("text-anchor", "middle")
    .text((d) => d);

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
  d3.select(".stats-chart").selectAll("rect")
    .data(statData)
    .join("rect")
    .attr("x", (d) => xScale(d.x))
    .attr("y", (d) => yScale(d.y))
    .attr("width", d => xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .attr("fill", (d) => d.x.getFullYear() === selectedYear ? "orange" : "green")
    .classed("hover-cursor", true)
    .on("click", (e, d) => {
      updateAveragesChart(hitterData, d.x.getFullYear(), selectedStat);
      updateResultsChart(hitterData, d.x.getFullYear(), selectedStat);
      updateStatsChart(hitterData, d.x.getFullYear(), selectedStat);
    });
}

/**
 * Updates the batting chart using the hitter data provided.
 * @param {object} hitterData JSON object with season by season batting data
 * @param {object} weights wOBA weights
 */
function updateModernChart(hitterData, weights) {
  let years = hitterData.map((season) => `'${season.yearID.toString().substring(2)}`);
  let totals = hitterData.map((season) => season.AB + season.BB - season.IBB + season.SF + season.HBP);
  let homers = hitterData.map((season) => season.HR);
  let homerunRate = hitterData.map((season, i) => season.HR / totals[i] || 0);
  let triples = hitterData.map((season) => season["3B"]);  
  let tripleRate = hitterData.map((season, i) => (season["3B"] + season.HR) / totals[i] || 0);
  let doubles = hitterData.map((season) => season["2B"]);
  let doubleRate = hitterData.map((season, i) => (season["2B"] + season["3B"] + season.HR) / totals[i] || 0);
  let singles = hitterData.map((season) => season.H - season["2B"] - season["3B"] - season.HR);
  let singleRate = hitterData.map((season, i) => (season.H) / totals[i] || 0);
  let hbps = hitterData.map((season) => season.HBP);
  let hbpRate = hitterData.map((season, i) => (season.HBP + season.H) / totals[i] || 0);
  let walks = hitterData.map((season) => season.BB - season.IBB);
  let walkRate = hitterData.map((season, i) => (season.BB - season.IBB + season.HBP + season.H) / totals[i] || 0);

  // Construct the scales and axes.
  let xScale = d3.scaleBand()
                  .domain(years)
                  .range([0, CHART_WIDTH - MARGIN.left - MARGIN.right])
                  .padding(.2);
  let xAxis = d3.axisBottom();
  xAxis.scale(xScale);
  let yScale = d3.scaleLinear()
                  .domain([0, 0.6])
                  .range([CHART_HEIGHT - MARGIN.top - MARGIN.bottom, 0])
                  .nice();
  let yAxis = d3.axisLeft();
  yAxis.scale(yScale);

  let colorScale = d3.scaleOrdinal(d3.schemeYlOrBr[9]);
  let colors = [];
  for (let i = 0; i < 9; i++) {
    let c = colorScale(i);
    if (i >= 3)
      colors.push(c);
  }

  // Draw each of the axes to the chart.
  let modernDiv = d3.select("#modern-div");
  modernDiv.select(".x-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (CHART_HEIGHT - MARGIN.bottom) + ")")
    .call(xAxis);
  modernDiv.select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
    .call(yAxis);

  // Draw the rectangles for t
  let walksRect = modernDiv.select(".modern-chart").selectAll(".walk")
    .data(years.map((d, i) => {return {x: years[i], y: walkRate[i], amount: walks[i], weight: weights["uBB"]}}))
    .join("rect")
    .classed("walk", true)
    .style("fill", colors[0])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["uBB"] / weights.hr) / 2)
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["uBB"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Unintentional Walks x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  let hbpRect = modernDiv.select(".modern-chart").selectAll(".hit-by-pitch")
    .data(years.map((d, i) => {return {x: years[i], y: hbpRate[i], amount: hbps[i], weight: weights["hbp"]}}))
    .join("rect")
    .classed("hit-by-pitch", true)
    .style("fill", colors[1])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["hbp"] / weights.hr) / 2)
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["hbp"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Hit By Pitches x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  let singlesRect = modernDiv.select(".modern-chart").selectAll(".single")
    .data(years.map((d, i) => {return {x: years[i], y: singleRate[i], amount: singles[i], weight: weights["1b"]}}))
    .join("rect")
    .classed("single", true)
    .style("fill", colors[2])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["1b"] / weights.hr) / 2)
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["1b"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Singles x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  let doublesRect = modernDiv.select(".modern-chart").selectAll(".double")
    .data(years.map((d, i) => {return {x: years[i], y: doubleRate[i], amount: doubles[i], weight: weights["2b"]}}))
    .join("rect")
    .classed("double", true)
    .style("fill", colors[3])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["2b"] / weights.hr) / 2)
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["2b"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Doubles x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  let triplesRect = modernDiv.select(".modern-chart").selectAll(".triple")
    .data(years.map((d, i) => {return {x: years[i], y: tripleRate[i], amount: triples[i], weight: weights["3b"]}}))
    .join("rect")
    .classed("triple", true)
    .style("fill", colors[4])
    .attr("x", (d) => MARGIN.left + xScale(d.x) + xScale.bandwidth() * (1 - weights["3b"] / weights.hr) / 2)
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
    .attr("width", xScale.bandwidth() * weights["3b"] / weights.hr)
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Triples x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);

  let homeRunRect = modernDiv.select(".modern-chart").selectAll(".home-run")
    .data(years.map((d, i) => {return {x: years[i], y: homerunRate[i], amount: homers[i], weight: weights["hr"]}}))
    .join("rect")
    .classed("home-run", true)
    .style("fill", colors[5])
    .attr("x", (d) => MARGIN.left + xScale(d.x))
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.y))
    .html((d) => `<title>${d.amount} Home Runs x ${d.weight} Runs Created Each = ${(d.amount * d.weight).toFixed(2)} Runs</title>`);
}