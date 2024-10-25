import { getPlayers, getPlayerData} from "./data.js";
import {setupTable, updatePlayerSelect, updateTable } from "./updates.js";

/** 
 * Updates the visualizations with data of the current selected franchise.
*/
async function adjustData() {
    updateTable(await getPlayerData())
   /* updateWebsite(await getFranchiseData()); */
}

/**
 * Script to setup and run the website.
 */
setupTable();
/*updateFranchiseSelect(await getFranchises()); */
updatePlayerSelect(await getPlayers());
adjustData();
d3.selectAll("select").on("change", (event) => adjustData());
