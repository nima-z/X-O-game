//imports
const http = require("http");
const WebSocketServer = require("websocket").server;
const uuidv4 = require("uuid").v4;
//server
const server = http.createServer();
const wsServer = new WebSocketServer({
  httpServer: server,
});

const BOARD_WIDTH = 3;
const PLAYER_LIMIT = 2;

//data related state
//e.g: {playerId1: connection1, playerId2: connection2, .... }
const players = {};
const games = {};

wsServer.on("request", (request) => {
  //join server
  //response => {playerId: id}
  const connection = request.accept(null, request.origin);
  const pId = uuidv4();
  players[pId] = { connection: connection };

  const responseBody = { type: "join-server", playerId: pId };
  connection.send(JSON.stringify(responseBody));
  connection.on("message", (message) => {
    const requestBody = JSON.parse(message.utf8Data); //potential error

    if (requestBody.type === "join-game") {
      // request => {type: str, playerId: str}
      // response => {type: "join-game", game}
      // game => {id: str, players: [], board: [][]}

      const { playerId, nickname } = requestBody;
      const player = { playerId, nickname, action: null, isTurn: false };
      const game = getAvailableGame(player);
      const responseBody = { type: "join-game", game: game };
      broadcastPlayers(game, responseBody);
    }

    if (requestBody.type === "play") {
      // request => {type, playerId, cellId, gameId}

      const { cellId, gameId, playerId } = requestBody;
      const i = Math.floor(cellId / BOARD_WIDTH);
      const j = cellId % BOARD_WIDTH;
      const game = games[gameId];
      game.board[i][j].player = game.players[playerId];
      Object.keys(game.players).forEach((pId) => {
        game.players[pId] = {
          ...game.players[pId],
          isTurn: !game.players[pId].isTurn,
        };
      });
      games[gameId] = game;
      const responseBody = { type: "update-game", game: games[gameId] };
      broadcastPlayers(game, responseBody);
    }
  });
});

server.listen(8080);

// arg: player object
function getAvailableGame(player) {
  for (let gameId of Object.keys(games)) {
    const game = games[gameId];
    if (Object.keys(game.players).length < PLAYER_LIMIT) {
      game.players = {
        ...game.players,
        [player.playerId]: { ...player, action: "o", isTurn: false },
      };
      games[gameId] = game;
      return game;
    }
  }
  const game = newGame(player);
  games[game.id] = game;
  return game;
}

function newGame(player) {
  const p = { ...player, action: "x", isTurn: true };
  return {
    id: uuidv4(),
    players: { [p.playerId]: p },
    board: createBoard(),
  };
}

function createBoard() {
  let board = [];

  for (let i = 0; i < BOARD_WIDTH; i++) {
    const row = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      row.push({ id: i * BOARD_WIDTH + j, player: null });
    }
    board.push(row);
  }
  return board;
}

function broadcastPlayers(game, responseBody) {
  Object.keys(game.players).forEach((pId) => {
    const p = players[pId];
    p.connection.send(JSON.stringify(responseBody));
  });
}
