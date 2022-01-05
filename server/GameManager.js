import Game from "./models/Game.js";
import { PLAYER_LIMIT, BOARD_WIDTH } from "./Constants.js";
import Player from "./models/Player.js";

let games = {};

export function prepareGame(gameId) {
  let game = getGameById(gameId);

  const actionAndTurns = getActions(game.playerIds);
  for (let id in game.players) {
    const players = {
      ...game.players,
      [id]: Player({
        ...game.players[id],
        ...actionAndTurns[id],
        rematchRequest: false,
      }),
    };
    game = Game({
      ...game,
      players,
      board: false,
      isFinished: false,
      winConditions: false,
      winnerCells: false,
    });
  }
  updateGames(game);
  return game;
}
export function joinGame(playerId, nickname) {
  const player = Player({ id: playerId, nickname });

  let game = getAvailableGame();
  const players = { ...game.players, [player.id]: player };
  game = Game({ ...game, players });

  updateGames(game);
  return game;
}

export function leaveGame(playerId) {
  for (let gameId in games) {
    let game = getGameById(gameId);
    if (playerId in game.players) {
      const { [playerId]: _, ...rest } = game.players;
      game = Game({ ...game, players: rest });
      updateGames(game);
      return game;
    }
  }
}

function endGame(gameId, winnerId, winnerCells) {
  let game = getGameById(gameId);
  const players = game.players;
  const winner = players[winnerId];
  const updatedPlayers = winner
    ? {
        ...players,
        [winnerId]: Player({ ...winner, wins: winner.wins + 1 }),
      }
    : players;

  const wonBy = winnerId ? { id: winner.id, nickname: winner.nickname } : null;

  game = Game({
    ...game,
    isFinished: true,
    count: game.count + 1,
    wonBy,
    players: updatedPlayers,
    winnerCells,
  });
  return game;
}

export function resignGame(playerId, gameId) {
  let game = getGameById(gameId);
  game = endGame(
    game.id,
    game.playerIds.filter((id) => id !== playerId)
  );
  updateGames(game);
  return game;
}

function updateTurn(players) {
  let updatedPlayers = {};
  Object.keys(players).forEach((pId) => {
    const p = players[pId];
    updatedPlayers = {
      ...updatedPlayers,
      [pId]: Player({ ...p, isTurn: !p.isTurn }),
    };
  });
  return updatedPlayers;
}

export function playGame(cellId, gameId, playerId) {
  let game = games[gameId];
  //update board
  const i = Math.floor(cellId / BOARD_WIDTH);
  const j = cellId % BOARD_WIDTH;
  const { action } = game.players[playerId];
  game.board[i][j].player = { playerId, action };

  const players = updateTurn(game.players);
  game = Game({ ...game, players });
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
      game = endGame(game.id, cell1.playerId, [c1, c2, c3]);
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
    game = Game({ ...game, winConditions: wConditions });
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
  for (let gameId in games) {
    const game = games[gameId];
    if (!game.isGameStarted && !game.isFinished) {
      return game;
    }
  }
  return Game({});
}

export function getGameById(gameId) {
  return games[gameId];
}

export function rematch(gameId, playerId) {
  let game = getGameById(gameId);
  const player = Player({ ...game.players[playerId], rematchRequest: true });
  const players = { ...game.players, [playerId]: player };
  game = Game({ ...game, players });
  updateGames(game);
  return game;
}

function updateGames(game) {
  games = { ...games, [game.id]: game };
}

export function resetGame(gameId) {
  let game = prepareGame(gameId);
  game = Game({ ...game, count: game.count });
  updateGames(game);
  return game;
}

export function playerLeave(playerId, gameId) {
  let game = getGameById(gameId);

  if (!game.isFinished) {
    game = resignGame(playerId, gameId);
    return leaveGame(playerId);
  }
  return leaveGame(playerId);
}
