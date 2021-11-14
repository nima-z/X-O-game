//imports
import http from "http";
import { server as WebSocketServer } from "websocket";
import { addConnection, broadcast } from "./ConnectionManager.js";
import { joinGame, playGame } from "./GameManager.js";
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
      broadcast(game.players, responseBody);
    }

    if (requestBody.type === "play") {
      const { cellId, gameId, playerId } = requestBody;
      const game = playGame({ cellId, gameId, playerId });
      const responseBody = { type: "update-game", game };
      broadcast(game.players, responseBody);
    }
  });
});

server.listen(8080);
