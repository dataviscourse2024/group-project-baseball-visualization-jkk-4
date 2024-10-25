import { getFranchises, getFranchiseData } from "./data.js";
import { setupWebsite, updateFranchiseSelect, updateWebsite } from "./updates.js";

/** 
 * Updates the visualizations with data of the current selected franchise.
*/
async function adjustData() {
    //const data = await getFranchiseData();
    //updateWebsite(data, "Zoilo Versalles");
    updateWebsite(await getFranchiseData(), "Zoilo Versalles"); // Pass the player name here
}

/**
 * Script to setup and run the website.
 */
setupWebsite();
updateFranchiseSelect(await getFranchises());
adjustData();
d3.selectAll("select").on("change", (event) => adjustData());
