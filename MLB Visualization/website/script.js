// Constants for the charts, that would be useful.
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 500;
const MARGIN = { left: 50, bottom: 20, top: 20, right: 20 };
const ANIMATION_DUATION = 1000;

setup();

/**
 * Sets up the webpage. Should only be called once on loading.
 */
function setup () {

  const franchiseSelect = d3.select('#franchises');
  d3.csv("../datasets/csv/TeamsFranchises.csv")
    .then(franchises => {
      franchises.map((f) => {
        franchiseSelect.append("option").text(f.franchName).property("value", f.franchID);
      })
    }).catch(e => {
      console.log(e);
      alert('Error finding franchise list');
    });

  // Create the svg and g elements.
  let barChart = d3.select("#Barchart-div").append("svg");
  barChart.append("g").classed("bar-chart", true);
  barChart.append("g").classed("x-axis", true);
  barChart.append("g").classed("y-axis", true);

  // Add event listeners to update data on user selections.
  d3.selectAll("select").on("change", changeData);

  changeData();
}

/**
 * Update the data according to document settings
 */
function changeData () {

  const franchiseID = d3.select('#franchises').property('value');
  d3.csv("../datasets/csv/Teams.csv")
    .then(teamData => {
      const seasons = teamData.filter((team) => team.franchID === franchiseID)
        .map((season) => ({
          year: `'${season.yearID.substring(2)}`,
          wins: parseInt(season.W),
          losses: parseInt(season.L)}));
      update(seasons)
    }).catch(e => {
      console.log(e);
      alert('Error getting season data for the selected franchise');
    });
}

/**
 * Render the visualizations
 * @param data
 */
function update (data) {

  let metric = d3.select("#metric").node().value;
  let xData = data.map((d) => d.year);
  let yData = data.map((d) => metric == "wins" ? d.wins : d.losses);
  updateBarChart(xData, yData);
}

/**
 * Updates the bar chart using the x and y data provided.
 * @param {string} xData categorical independent variable
 * @param {number} yData dependent variable
 */
function updateBarChart (xData, yData) {

  // Construct the scales and axes.
  let xScale = d3.scaleBand()
                  .domain(xData)
                  .range([0, CHART_WIDTH - MARGIN.left - MARGIN.right])
                  .padding(.2);
  let xAxis = d3.axisBottom();
  xAxis.scale(xScale);
  let yScale = d3.scaleLinear()
                  .domain([0, d3.max(yData)])
                  .range([CHART_HEIGHT - MARGIN.top - MARGIN.bottom, 0])
                  .nice();
  let yAxis = d3.axisLeft();
  yAxis.scale(yScale);

  // Draw each of the axes and bars to the chart.
  let barChartDiv = d3.select("#Barchart-div");
  barChartDiv.select(".x-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (CHART_HEIGHT - MARGIN.top) + ")")
    .call(xAxis);
  barChartDiv.select(".y-axis")
    .attr("transform", "translate(" + (MARGIN.left) + "," + (MARGIN.top) + ")")
    .call(yAxis);
  let bars = barChartDiv.select(".bar-chart").selectAll("rect")
    .data(xData.map((d, i) => {return {x: xData[i], y: yData[i]}}))

  bars.exit()
    .transition()
    .duration(ANIMATION_DUATION)
    .style("opacity", 0)
    .remove();

  bars = bars.enter().append("rect")
    .attr("x", (d) => MARGIN.left + xScale(d.x))
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom)
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => 0)
    .merge(bars);

  bars.transition()
    .duration(ANIMATION_DUATION)
    .attr("x", (d) => MARGIN.left + xScale(d.x))
    .attr("y", (d) => CHART_HEIGHT - MARGIN.bottom - yScale(0) + yScale(d.y))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.y));

  bars.on("mouseover", (event) => d3.select(event.currentTarget).classed("hovered", true))
    .on("mouseout", (event) => d3.select(event.currentTarget).classed("hovered", false));
}
