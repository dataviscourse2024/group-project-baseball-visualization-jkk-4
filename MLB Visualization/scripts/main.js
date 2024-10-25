import { getFranchises, getFranchiseData, getBattingData, getWobaWeights } from "./data.js";
import { setupWebsite, updateFranchiseSelect, updateWebsite } from "./updates.js";

/** 
 * Updates the visualizations with data of the current selected franchise.
*/
async function adjustData() {
    updateWebsite(await getFranchiseData(), await getBattingData(), await getWobaWeights());
}

/**
 * Script to setup and run the website.
 */
setupWebsite();
updateFranchiseSelect(await getFranchises());
adjustData();
d3.selectAll("select").on("change", (event) => adjustData());
