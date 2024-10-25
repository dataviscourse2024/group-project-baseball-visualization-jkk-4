const API_HOST = "http://localhost:8000";

/**
 * Gets data for all the MLB franchises.
 * @returns array of JSON franchise data
 */
export function getFranchises() {
    return d3.json(`${API_HOST}/franchises`)
        .then((franchises) => franchises)
        .catch((e) => console.log("An error occurred fetching the list of franchises:", e));
}

/**
 * Gets season data for the currently selected MLB franchise.
 * @returns array of JSON season data
 */
export function getFranchiseData() {
    const franchiseID = d3.select('#franchises').node().value;
    return d3.json(`${API_HOST}/franchise/${franchiseID}/`)
        .then((seasons) => seasons.map((s) => ({
                year: `'${s.yearID.toString().substring(2)}`,
                wins: s.W,
                losses: s.L})))
        .catch((e) => console.log("An error occurred fetching season data for the selected franchise:", e));
}

/**
 * Gets season data for the currently selected MLB hitter.
 * @param {string} playerID ID of selected player
 */
export function getBattingData(playerID="troutmi01") {
    return d3.json(`${API_HOST}/batting/${playerID}`)
        .then((seasons) => seasons)
        .catch((e) => console.log("An error occurred fetching batting data:", e));
}

/**
 * Gets the wOBA weights for each event based on the given year.
 * @param {number} year *currently uses dummy data*
 */
export function getWobaWeights(year) {
    return {
        "uBB": 0.690,
        "hbp": 0.722,
        "1b": 0.888,
        "2b": 1.271,
        "3b": 1.616,
        "hr": 2.101
    }
}