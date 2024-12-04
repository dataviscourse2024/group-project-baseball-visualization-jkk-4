const API_HOST = "http://localhost:8000";
export function getPlayers() {
    return d3.json(`${API_HOST}/players`)
        .then((players) => players)
        .catch((e) => console.log("An error occurred fetching the list of players:", e));
}
export function getPlayerOne() {
    const playerID = d3.select('#players1').node().value;
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
export function getPlayerTwo() {
    const playerID = d3.select('#players2').node().value;
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