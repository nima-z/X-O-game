import Game from "./models/Game.js";
import { PLAYER_LIMIT, BOARD_WIDTH } from "./Constants.js";
import Player from "./models/Player.js";

let games = {};

export function joinGame({ playerId, nickname }) {
  const player = Player({ playerId, nickname });

  let game = getAvailableGame();
  game = { ...game, players: { ...game.players, [player.playerId]: player } };
  const playerIds = Object.keys(game.players);

  if (playerIds.length === PLAYER_LIMIT) {
    const actionAndTurns = getActions(playerIds);

    for (let id in game.players) {
      const player = game.players[id];
      game = {
        ...game,
        players: {
          ...game.players,
          [id]: { ...player, ...actionAndTurns[id] },
        },
      };
    }
  }
  games = { ...games, [game.id]: game };
  return game;
}

export function playGame({ cellId, gameId, playerId }) {
  let game = games[gameId];
  const i = Math.floor(cellId / BOARD_WIDTH);
  const j = cellId % BOARD_WIDTH;
  const { action } = game.players[playerId];
  game.board[i][j].player = { playerId, action };
  Object.keys(game.players).forEach((pId) => {
    const player = game.players[pId];
    game = {
      ...game,
      players: {
        ...game.players,
        [pId]: { ...player, isTurn: !player.isTurn },
      },
    };
  });
  games = { ...games, [game.id]: game };
  return game;
}

function getActions(players) {
  const actions = ["x", "o"];
  const isTurns = [true, false];
  const rAction = Math.floor(Math.random() * actions.length);
  const rTurn = Math.floor(Math.random() * isTurns.length);

  return {
    [players[0]]: { action: actions[rAction], isTurn: isTurns[rTurn] },
    [players[1]]: {
      action: actions[actions.length - 1 - rAction],
      isTurn: isTurns[isTurns.length - 1 - rTurn],
    },
  };
}

function getAvailableGame() {
  for (let gameId of Object.keys(games)) {
    const game = games[gameId];
    if (Object.keys(game.players).length < PLAYER_LIMIT) {
      return game;
    }
  }
  return Game({});
}
