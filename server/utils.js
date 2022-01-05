import { ClientPlayer } from "./models/Player.js";

function joinGamePayload(game) {
  return {
    type: "join-game",
    isGameStarted: game.isGameStarted,
  };
}

function endGamePayload(game) {
  return {
    type: "end-game",
    isDraw: !game.wonBy,
    cells: game.winnerCells,
    wonBy: game.wonBy,
  };
}

function updateGamePayload(game) {
  return {
    type: "update-game",
    id: game.id,
    players: game.playerIds.map((id) => ClientPlayer(game.players[id])),
    board: game.board,
    isTurn: game.playerIds.find((id) => game.players[id].isTurn),
    count: game.count,
  };
}

function notifyPayload(message) {
  return { type: "notify", message };
}
function joinServerPayload() {}

export const payloads = {
  joinServer: joinServerPayload,
  joinGame: joinGamePayload,
  notify: notifyPayload,
  updateGame: updateGamePayload,
  endGame: endGamePayload,
};
