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

export function getPlayerData() {
    const playerID = d3.select('#players').node().value;
    return d3.json(`${API_HOST}/players/${playerID}/`)
        .then((playerData) => playerData)
        .catch((e) => console.log("An error occurred fetching the list of playerData:", e));

}