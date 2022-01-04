//imports
import http from "http";
import { server as WebSocketServer } from "websocket";
import { addConnection, broadcast } from "./ConnectionManager.js";
import {
  isGameFinished,
  joinGame,
  leaveGame,
  playerLeave,
  playGame,
  rematch,
  resetGame,
  resignGame,
} from "./GameManager.js";
//server
const server = http.createServer();
const wsServer = new WebSocketServer({
  httpServer: server,
});

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  const playerId = addConnection(connection);
  const responseBody = { type: "join-server", playerId };
  connection.send(JSON.stringify(responseBody));

  connection.on("message", (message) => {
    const requestBody = JSON.parse(message.utf8Data); //potential error

    if (requestBody.type === "join-game") {
      const { playerId, nickname } = requestBody;
      const prevGame = leaveGame(playerId);
      if (prevGame) {
        const opponent = Object.keys(prevGame.players)[0];
        if (opponent) {
          const responseBody = {
            type: "notify",
            message: `${prevGame.players[opponent].nickname} left the game!`,
          };
          broadcast([opponent], responseBody);
        }
      }
      const game = joinGame({ playerId, nickname });
      const responseBody = {
        type: "join-game",
        isGameStarted: game.status === 2,
      };
      broadcast(Object.keys(game.players), responseBody);

      if (game.status !== 2) return;

      const updateBody = { type: "update-game", game };
      broadcast(Object.keys(game.players), updateBody);
    }

    if (requestBody.type === "play") {
      const { cellId, gameId, playerId } = requestBody;
      let game = playGame({ cellId, gameId, playerId });
      const responseBody = { type: "update-game", game };
      broadcast(Object.keys(game.players), responseBody);

      game = isGameFinished(game.id);
      if (!game.isFinished) return;
      const { wonBy, winnerCells } = game;
      const body = {
        type: "end-game",
        wonBy,
        winnerCells,
        endBy: "normal",
      };
      broadcast(Object.keys(game.players), body);
    }

    if (requestBody.type === "resign") {
      const { playerId, gameId } = requestBody;
      const game = resignGame({ playerId, gameId });
      const { wonBy, winnerCells } = game;
      const responseBody = {
        type: "end-game",
        wonBy: wonBy,
        winnerCells,
      };
      broadcast(Object.keys(game.players), responseBody);

      const { [playerId]: _, ...rest } = game.players;
      const opponent = Object.keys(rest)[0];
      const notification = {
        type: "notify",
        message: `${_.nickname} resigned!`,
      };
      broadcast([opponent], notification);
    }

    if (requestBody.type === "rematch") {
      const { gameId, playerId } = requestBody;
      const game = rematch(gameId, playerId);
      if (game.status === 2) {
        //reset and start game
        const game = resetGame(gameId);
        const responseBody = { type: "update-game", game };
        broadcast(Object.keys(game.players), responseBody);
        return;
      }

      //notify: opponent is ready for rematch.
      const opponentId = Object.keys(game.players).filter(
        (pId) => pId !== playerId
      )[0];

      if (!opponentId) return;

      const responseBody = {
        type: "notify",
        message: `${game.players[playerId].nickname} is ready for rematch!`,
      };
      broadcast([opponentId], responseBody);
    }

    if (requestBody.type === "leave") {
      const { gameId, playerId, nickname } = requestBody;
      const game = playerLeave(playerId, gameId);
      const { wonBy, winnerCells } = game;
      const responseBody = {
        type: "end-game",
        wonBy,
        winnerCells,
      };
      broadcast(Object.keys(game.players), responseBody);

      const notif = {
        type: "notify",
        message: `${nickname} left the game!`,
      };

      broadcast(Object.keys(game.players), notif);
    }
  });

  connection.on("close", (code, message) => {
    console.log({ code, message });
  });
});

server.listen(8080);
