// Constants for the charts, that would be useful.
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 400;
const MARGIN = { left: 50, bottom: 20, top: 20, right: 20 };
const ANIMATION_DUATION = 1000;

/**
 * Set up the website with proper DOM elements.
 */
/*
export function setupWebsite() {
    let barChart = d3.select("#Barchart-div").append("svg").style("width", CHART_WIDTH).style("height", CHART_HEIGHT);
    barChart.append("g").classed("bar-chart", true);
    barChart.append("g").classed("x-axis", true);
    barChart.append("g").classed("y-axis", true);
}
    ex
*/
/**
 * Updates the franchise select box with all teams.
 * @param {object[]} franchises franchise ID and name
 */
/*
export function updateFranchiseSelect(franchises) {
    const franchiseSelect = d3.select('#franchises');
    franchises.forEach((f, i) => {
        franchiseSelect.append("option").text(f.franchName).property("value", f.franchID).property("selected", i == 1);
    });
}
  */
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
export function updateWebsite(data, playerName) {

  // Update the player image
  updatePlayerImage(); //playerName);
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
