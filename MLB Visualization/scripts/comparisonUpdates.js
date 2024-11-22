export function updatePlayerSelect(players) {
    let playerSelect = d3.select('#players1');
    playerSelect.selectAll("option").remove(); 
  
    let addedValues = [];
    players.forEach((player, i) => {
      let nameString = player.nameFirst + ' ' + player.nameLast;
      if (!addedValues.includes(nameString)) {
        playerSelect.append("option")
          .text(nameString)
          .property("value", player.playerID)
          .property("selected", i == 0);
        addedValues.push(nameString);
      }
    });
    playerSelect = d3.select('#players2');
    playerSelect.selectAll("option").remove(); 
  
    addedValues = [];
    players.forEach((player, i) => {
      let nameString = player.nameFirst + ' ' + player.nameLast;
      if (!addedValues.includes(nameString)) {
        playerSelect.append("option")
          .text(nameString)
          .property("value", player.playerID)
          .property("selected", i == 0);
        addedValues.push(nameString);
      }
    });
}