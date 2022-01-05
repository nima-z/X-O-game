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
  prepareGame,
  rematch,
  resetGame,
  resignGame,
} from "./GameManager.js";
import { payloads } from "./utils.js";
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
      if (prevGame?.playerIds.length > 0) {
        const opponent = prevGame.playerIds[0];
        broadcast(
          [opponent],
          payloads.notify(
            `${prevGame.players[opponent].nickname} left the game!`
          )
        );
      }
      let game = joinGame(playerId, nickname);

      broadcast(game.playerIds, payloads.joinGame(game));

      if (!game.isGameStarted) return;
      game = prepareGame(game.id);
      broadcast(game.playerIds, payloads.updateGame(game));
    }

    if (requestBody.type === "play") {
      const { cellId, gameId, playerId } = requestBody;
      let game = playGame(cellId, gameId, playerId);
      broadcast(game.playerIds, payloads.updateGame(game));

      game = isGameFinished(game.id);
      if (!game.isFinished) return;
      broadcast(game.playerIds, payloads.endGame(game));
    }

    if (requestBody.type === "resign") {
      const { playerId, gameId } = requestBody;
      const game = resignGame(playerId, gameId);
      broadcast(game.playerIds, payloads.endGame(game));

      const opponentId = game.playerIds.find((p) => p !== playerId);
      broadcast(
        [opponentId],
        payloads.notify(`${game.players[playerId].nickname} resigned!`)
      );
    }

    if (requestBody.type === "rematch") {
      const { gameId, playerId } = requestBody;
      const game = rematch(gameId, playerId);
      if (game.isGameStarted) {
        //reset and start game
        const game = resetGame(gameId);
        broadcast(game.playerIds, payloads.updateGame(game));
        return;
      }

      //notify: opponent is ready for rematch.
      const opponentId = game.playerIds.find((pId) => pId !== playerId);

      if (!opponentId) return;

      broadcast(
        [opponentId],
        payloads.notify(
          `${game.players[playerId].nickname} is ready for rematch!`
        )
      );
    }

    if (requestBody.type === "leave") {
      const { gameId, playerId, nickname } = requestBody;
      const game = playerLeave(playerId, gameId);
      broadcast(game.playerIds, payloads.endGame(game));

      broadcast(game.playerIds, payloads.notify(`${nickname} left the game!`));
    }
  });

  connection.on("close", (code, message) => {
    console.log({ code, message });
  });
});

server.listen(8080);
