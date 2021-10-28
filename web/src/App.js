import React, { useState, Fragment } from "react";

import Board from "./components/Board/Board";
import Button from "./components/UI/Button";

import "./App.css";

const ws = new WebSocket("ws://localhost:8080");
let playerId = null;
let board = null;

// const requestBody = { type: "join-game", playerId: playerId }
// ws.send(JSON.stringify(requestBody)

function App() {
  const [isPlay, setIsPlay] = useState(false);
  const [game, setGame] = useState(null);

  ws.onmessage = function (message) {
    const response = JSON.parse(message.data);
    if (response.type === "join-server") {
      playerId = response.playerId;
    }

    if (response.type === "join-game") {
      const game = {
        ...response.game,
        isTurn: response.game.players[playerId].isTurn,
      };

      console.log(game);
      setGame(game);
      if (Object.keys(response.game.players).length === 2) {
        setIsPlay(true);
      }
    }

    if (response.type === "update-game") {
      const game = {
        ...response.game,
        isTurn: response.game.players[playerId].isTurn,
      };

      setGame((game) => ({ ...game, ...response.game }));
    }
  };

  function startGameHandler() {
    const requestBody = { type: "join-game", playerId: playerId };
    ws.send(JSON.stringify(requestBody));
  }

  function extractor(cell) {
    ws.send(
      JSON.stringify({
        type: "play",
        playerId: playerId,
        cellId: cell.id,
        gameId: game.id,
      })
    );
  }

  return (
    <Fragment>
      {!isPlay && <Button onClick={startGameHandler}>Play</Button>}
      {isPlay && <Board game={game} extractor={extractor} />}
    </Fragment>
  );
}

export default App;
