import { getPlayers} from "./comparisonData.js";
import {updatePlayerSelect} from "./comparisonUpdates.js";

updatePlayerSelect(await getPlayers());