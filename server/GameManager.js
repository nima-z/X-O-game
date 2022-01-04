import Game from "./models/Game.js";
import { PLAYER_LIMIT, BOARD_WIDTH } from "./Constants.js";
import Player from "./models/Player.js";

let games = {};

export function joinGame({ playerId, nickname }) {
  const player = Player({ playerId, nickname });

  let game = getAvailableGame();

  game = {
    ...game,
    players: {
      ...game.players,
      [player.playerId]: player,
    },
    status: game.status + 1,
  };

  const playerIds = Object.keys(game.players);

  if (game.status === PLAYER_LIMIT) {
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

  updateGames(game);
  return game;
}

export function leaveGame(playerId) {
  for (let gameId in games) {
    let game = games[gameId];
    if (playerId in game.players) {
      const { [playerId]: _, ...rest } = game.players;
      game = { ...game, players: rest, status: game.status - 1 };
      updateGames(game);
      return game;
    }
  }
}

function endGame(gameId, winnerId, winnerCells) {
  const game = getGameById(gameId);
  const players = game.players;
  const winner = players[winnerId];
  const updatedPlayers = winner
    ? {
        ...players,
        [winnerId]: { ...winner, wins: players[winnerId].wins + 1 },
      }
    : players;

  return {
    ...game,
    isFinished: true,
    count: game.count + 1,
    wonBy: winnerId
      ? { playerId: winner.playerId, nickname: winner.nickname }
      : null,
    players: updatedPlayers,
    winnerCells: winnerCells,
  };
}

export function resignGame({ playerId, gameId }) {
  let game = games[gameId];
  const { [playerId]: _, ...winner } = game.players;
  game = endGame(game.id, Object.keys(winner)[0]);
  updateGames(game);
  return game;
}

// update board
// update turn
export function playGame({ cellId, gameId, playerId }) {
  let game = games[gameId];
  //update board
  const i = Math.floor(cellId / BOARD_WIDTH);
  const j = cellId % BOARD_WIDTH;
  const { action } = game.players[playerId];
  game.board[i][j].player = { playerId, action };

  //update turn
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
  //update games state
  updateGames(game);
  return game;
}

export function isGameFinished(gameId) {
  let game = getGameById(gameId);
  const wConditions = Array.from(game.winConditions);
  for (let i = 0; i < wConditions.length; i++) {
    const [c1, c2, c3] = wConditions[i];
    const cell1 =
      game.board[Math.floor(c1 / BOARD_WIDTH)][c1 % BOARD_WIDTH].player;
    const cell2 =
      game.board[Math.floor(c2 / BOARD_WIDTH)][c2 % BOARD_WIDTH].player;
    const cell3 =
      game.board[Math.floor(c3 / BOARD_WIDTH)][c3 % BOARD_WIDTH].player;

    // same player on each condition => player won
    if (
      cell1 &&
      cell2 &&
      cell3 &&
      cell1.playerId === cell2.playerId &&
      cell2.playerId === cell3.playerId
    ) {
      game = endGame(game.id, cell1.playerId);
      break;
    }

    //different players on each condition => remove the condition
    if (
      (cell1 && cell2 && cell1.playerId !== cell2.playerId) ||
      (cell1 && cell3 && cell1.playerId !== cell3.playerId) ||
      (cell2 && cell3 && cell2.playerId !== cell3.playerId)
    ) {
      wConditions.splice(i--, 1);
    }
  }

  if (wConditions.length === 0) {
    game = endGame(game.id, null, null);
  }

  if (!game.isFinished) {
    game = { ...game, winConditions: wConditions };
  }

  updateGames(game);
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
    if (Object.keys(game.players).length < PLAYER_LIMIT && !game.isFinished) {
      return game;
    }
  }
  return Game({});
}

export function getGameById(gameId) {
  return games[gameId];
}

export function rematch(gameId, playerId) {
  let game = games[gameId];
  game = {
    ...game,
    players: {
      ...game.players,
      [playerId]: { ...game.players[playerId], rematchRequest: true },
    },
  };

  const status = Object.keys(game.players).reduce(
    (current, pId) => game.players[pId].rematchRequest + current,
    0
  );

  game = { ...game, status };
  updateGames(game);
  return game;
}

function updateGames(game) {
  games = { ...games, [game.id]: game };
}

export function resetGame(gameId) {
  let game = games[gameId];

  const actionAndTurns = getActions(Object.keys(game.players));

  let players = game.players;
  for (let id in game.players) {
    const player = Player({ ...game.players[id] });
    players = {
      ...players,
      [id]: { ...player, ...actionAndTurns[id] },
    };
  }

  const newGame = Game({ id: game.id, players, count: game.count });
  updateGames(newGame);
  return newGame;
}

export function playerLeave(playerId, gameId) {
  let game = games[gameId];

  if (!game.isFinished) {
    game = resignGame({ playerId, gameId });
    return leaveGame(playerId);
  }
  return leaveGame(playerId);
}
