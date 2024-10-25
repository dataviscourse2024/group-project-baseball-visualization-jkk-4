import { getPlayers, getPlayerData, getWobaWeights } from "./data.js";
import { setupWebsite, updateWebsite, setupTable, updatePlayerSelect, updateTable } from "./updates.js";

/** 
 * Updates the visualizations with data of the current selected franchise.
*/
async function adjustData() {
    updateWebsite(await getPlayerData(), await getWobaWeights(), "Zoilo Versalles");
    updateTable(await getPlayerData())
}

/**
 * Script to setup and run the website.
 */
setupWebsite();
setupTable();
updatePlayerSelect(await getPlayers());
adjustData();
d3.selectAll("select").on("change", (event) => adjustData());
