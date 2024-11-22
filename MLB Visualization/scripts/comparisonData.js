const API_HOST = "http://localhost:8000";
export function getPlayers() {
    return d3.json(`${API_HOST}/players`)
        .then((players) => players)
        .catch((e) => console.log("An error occurred fetching the list of players:", e));
}