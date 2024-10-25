const API_HOST = "http://localhost:8000";

/**
 * Gets data for all the MLB franchises.
 * @returns array of JSON franchise data
 */
/*
export function getFranchises() {
    return d3.json(`${API_HOST}/franchises`)
        .then((franchises) => franchises)
        .catch((e) => console.log("An error occurred fetching the list of franchises:", e));
}
*/
/**
 * Gets season data for the currently selected MLB franchise.
 * @returns array of JSON season data
 */
/*
export function getFranchiseData() {
    const franchiseID = d3.select('#franchises').node().value;
    return d3.json(`${API_HOST}/franchise/${franchiseID}/`)
        .then((seasons) => seasons.map((s) => ({
                year: `'${s.yearID.toString().substring(2)}`,
                wins: s.W,
                losses: s.L})))
        .catch((e) => console.log("An error occurred fetching season data for the selected franchise:", e));
}
        */
/**
 * Gets data for all the MLB franchises.
 * @returns array of JSON batter data
 */
export function getPlayers() {
    return d3.json(`${API_HOST}/players`)
        .then((players) => players)
        .catch((e) => console.log("An error occurred fetching the list of players:", e));
}
export function getPlayerData() {
    const playerID = d3.select('#players').node().value;
    return d3.json(`${API_HOST}/players/${playerID}/`)
        .then((playerData) => playerData)
        .catch((e) => console.log("An error occurred fetching the list of playerData:", e));

}