import { getPlayers, getPlayerOne, getPlayerTwo} from "./comparisonData.js";
import {setupWebsite, updatePlayerSelect, updateStatSelect, updateChart} from "./comparisonUpdates.js";

async function adjustStatType() {
    updateStatSelect();
    adjustChart();
}
async function adjustChart() {
    updateChart(await getPlayers(), await getPlayerOne(), await getPlayerTwo()) 
}
setupWebsite();
updatePlayerSelect(await getPlayers());
adjustStatType();
adjustChart();
d3.selectAll("#player-type").on("change", (event) => adjustStatType());
d3.selectAll("#players1").on("change", (event) => adjustChart());
d3.selectAll("#players2").on("change", (event) => adjustChart());
d3.selectAll("#statList").on("change", (event) => adjustChart());