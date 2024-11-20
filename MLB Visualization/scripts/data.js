const API_HOST = "http://localhost:8000";

/**
 * Gets data for all the MLB players.
 * @returns array of JSON batter data
 */
export function getPlayers() {
    return d3.json(`${API_HOST}/players`)
        .then((players) => players)
        .catch((e) => console.log("An error occurred fetching the list of players:", e));
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

  export function getPlayerData() {
    const playerID = d3.select('#players').node().value;
    const batting_pitching = d3.select('#player-type').node().value;
    if (batting_pitching == 'Batting') {
        return d3.json(`${API_HOST}/batters/${playerID}/`)
            .then((playerData) => playerData)
            .catch((e) => console.log("An error occurred fetching the list of playerData:", e));
    }
    else {
        return d3.json(`${API_HOST}/pitchers/${playerID}/`)
            .then((playerData) => playerData)
            .catch((e) => console.log("An error occurred fetching the list of playerData:", e));
    }
}