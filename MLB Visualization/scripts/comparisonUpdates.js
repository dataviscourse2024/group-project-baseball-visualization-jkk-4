// Constants for the charts, that would be useful.
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 400;
const MARGIN = { left: 60, bottom: 50, top: 50, right: 40 };

export function setupWebsite() {
  let comparisonChart = d3.select("#comparison").append("svg").style("width", CHART_WIDTH).style("height", CHART_HEIGHT);
  comparisonChart.append("g").classed("x-axis", true);
  comparisonChart.append("g").classed("y-axis", true);
  comparisonChart.append("text")
                 .attr("transform", `translate(${CHART_WIDTH / 2}, ${CHART_HEIGHT - MARGIN.bottom + 40})`)
                 .attr("class", "x-axis-label")
                 .style("text-anchor", "middle")
                 .text("Season Number");
  comparisonChart.append("text").classed("y-axis-label", true);
  comparisonChart.append("g").classed("chart", true);
  comparisonChart.append("g").classed("legend", true). attr("transform", `translate(${CHART_WIDTH - 140}, 20)`);
}
export function updatePlayerSelect(players) {
    let playerSelect = d3.select('#players1');
    playerSelect.selectAll("option").remove(); 
    let addedValues = [];
    players.forEach((player, i) => {
      let nameString = player.nameFirst + ' ' + player.nameLast;
      if (!addedValues.includes(nameString)) {
        playerSelect.append("option")
          .text(nameString)
          .property("value", player.playerID)
          .property("selected", i == 0)
        addedValues.push(nameString);
      }
    });
    playerSelect = d3.select('#players2');
    playerSelect.selectAll("option").remove(); 
  
    addedValues = [];
    players.forEach((player, i) => {
      let nameString = player.nameFirst + ' ' + player.nameLast;
      if (!addedValues.includes(nameString)) {
        playerSelect.append("option")
          .text(nameString)
          .property("value", player.playerID)
          .property("selected", i == 0)
        addedValues.push(nameString);
      }
    });
}
export function updateStatSelect() {
  let statSelect = d3.select('#statList')
  statSelect.selectAll("option").remove(); 
  let playerType = d3.select("#player-type").node().value
  if (playerType == "Pitching") {
    let posVal = ["W","L","G","GS","CG","SHO","SV","IPouts","H","ER","HR","BB","SO",
      "BAOpp","ERA","IBB","WP","HBP","BK","BFP","GF","R","SH","SF","GIDP"]
    posVal.forEach(val => {
      statSelect.append("option")
                .text(val)
                .property("value", val)
    })
  }
  else {
    let posVal = ["G","AB","R","H","2B","3B","HR","RBI","SB","CS","BB","SO","IBB",
      "HBP","SH","SF","GIDP"]
    posVal.forEach(val => {
      statSelect.append("option")
                  .text(val)
                  .property("value", val)
    })
  }
}
//Used ChatGPT for help with this function. 
export function updateChart(players, playerOne, playerTwo) {
  let name1 = '';
  let name2 = '';
  players.forEach((player) => {
    if (d3.select("#players1").node().value == player.playerID) {
      name1 = player.nameFirst + ' ' + player.nameLast;
    }
    if (d3.select("#players2").node().value == player.playerID) {
      name2 = player.nameFirst + ' ' + player.nameLast;
    }
  });
  let selectedStat = d3.select('#statList').node().value;
  let playerOneVal = playerOne.map(d => { return {selectedStatVal: d[selectedStat], year: d.yearID}});
  let tempVal = d3.rollup(playerOneVal,
    (group) => d3.sum(group, d => d.selectedStatVal),
    d => d.year
  );
  let playerOneObject = [];
  let i = 1
  tempVal.forEach((number) => {
    let tempPlayer = { number, i: i};
    playerOneObject.push(tempPlayer);
    i += 1
  });
  let playerTwoVal = playerTwo.map(d => { return {selectedStatVal: d[selectedStat], year: d.yearID}});
  tempVal = d3.rollup(playerTwoVal,
    (group) => d3.sum(group, d => d.selectedStatVal),
    d => d.year
  );
  let playerTwoObject = [];
  i = 1
  tempVal.forEach((number) => {
    let tempPlayer = { number, i: i};
    playerTwoObject.push(tempPlayer);
    i += 1
  });
  let battingDiv = d3.select("#comparison");
  let playerOneNumber = playerOneObject.map(d => d.number)
  let playerTwoNumber = playerTwoObject.map(d => d.number)
  // Scales
  let xScale = d3.scaleLinear()
                 .domain([1, d3.max([playerOneObject.length, playerTwoObject.length])])
                 .range([MARGIN.left, CHART_WIDTH - MARGIN.right]);

  let yScale = d3.scaleLinear()
                 .domain([0, d3.max(playerOneNumber.concat(playerTwoNumber))])
                 .range([CHART_HEIGHT - MARGIN.bottom, MARGIN.top])
                 .nice();

  // Area Generator
  let areaGenerator = d3.area()
                        .x(d => xScale(d.i))
                        .y1(d => yScale(d.number))
                        .y0(() => CHART_HEIGHT - MARGIN.bottom);

  // Remove old paths and render new areas
  battingDiv.select(".chart").selectAll("path").remove();

  battingDiv.select(".chart")
            .append("path")
            .datum(playerOneObject)
            .attr("class", "area")
            .attr("fill", "skyblue")
            .attr("fill-opacity", 0.25)
            .attr("stroke", "skyblue")
            .attr("stroke-width", 0.5)
            .attr("d", areaGenerator);

  if (JSON.stringify(playerOneVal) != JSON.stringify(playerTwoVal)) {
    battingDiv.select(".chart")
              .append("path")
              .datum(playerTwoObject)
              .attr("class", "area")
              .attr("fill", "red")
              .attr("fill-opacity", 0.25)
              .attr("stroke", "red")
              .attr("stroke-width", 0.5)
              .attr("d", areaGenerator);
  }

  // Axes
  let xAxis = d3.axisBottom(xScale)
                .ticks(d3.max([playerOneObject.length, playerTwoObject.length])- 1);

  let yAxis = d3.axisLeft(yScale);

  // Render X-Axis
  battingDiv.select(".x-axis")
            .attr("transform", `translate(0, ${CHART_HEIGHT - MARGIN.bottom})`)
            .call(xAxis);

  // Render Y-Axis
  battingDiv.select(".y-axis")
            .attr("transform", `translate(${MARGIN.left}, 0)`)
            .call(yAxis);

  // Y Axis label

  battingDiv.select(".y-axis-label").selectAll("*").remove();
  battingDiv.select(".y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -(CHART_HEIGHT / 2))
            .attr("y", MARGIN.left - 40)
            .style("text-anchor", "middle")
            .text(d => `Number of ${selectedStat}'s for each player`);
  let legend = battingDiv.select(".legend");
  legend.selectAll("*").remove();
  legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "skyblue")
  legend.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .style("font-size", "12px")
        .text(name1);
  if (JSON.stringify(playerOneVal) != JSON.stringify(playerTwoVal)) {
    legend.append("rect")
          .attr("x", 0)
          .attr("y", 20)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", "red")
    legend.append("text")
          .attr("x", 20)
          .attr("y", 32)
          .style("font-size", "12px")
          .text(name2);
  }
}

