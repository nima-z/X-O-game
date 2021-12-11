//imports
import http from "http";
import { server as WebSocketServer } from "websocket";
import { addConnection, broadcast } from "./ConnectionManager.js";
import {
  joinGame,
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
      const game = joinGame({ playerId, nickname });
      const responseBody = { type: "join-game", game: game };
      broadcast(Object.keys(game.players), responseBody);
    }

    if (requestBody.type === "play") {
      const { cellId, gameId, playerId } = requestBody;
      const game = playGame({ cellId, gameId, playerId });
      const responseBody = { type: "update-game", game };
      broadcast(Object.keys(game.players), responseBody);
    }

    if (requestBody.type === "resign") {
      const { playerId, gameId } = requestBody;
      const game = resignGame({ playerId, gameId });
      const responseBody = { type: "update-game", game };
      broadcast(Object.keys(game.players), responseBody);
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
        type: "notify-rematch",
        name: game.players[playerId].nickname,
      };
      broadcast([opponentId], responseBody);
    }
  });
});

server.listen(8080);
