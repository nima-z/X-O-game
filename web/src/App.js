import React, { useState, Fragment } from "react";

import MainTable from "./components/Board/MainTable";
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
  const [isLoading, setIsLoading] = useState(false);

  ws.onmessage = function (message) {
    const response = JSON.parse(message.data);
    if (response.type === "join-server") {
      playerId = response.playerId;
    }

    if (response.type === "join-game") {
      setIsLoading(true);
      const game = {
        ...response.game,
        isTurn: response.game.players[playerId].isTurn,
      };

      console.log(response.game.players);
      setGame(game);
      if (Object.keys(response.game.players).length === 2) {
        setIsLoading(false);
        setIsPlay(true);
      }
    }

    if (response.type === "update-game") {
      const gameObj = {
        ...response.game,
        isTurn: response.game.players[playerId].isTurn,
      };

      setGame((game) => ({ ...game, ...gameObj }));
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
      {isLoading && <p className="loadingText">Waiting for the Opponent...</p>}
      {isPlay && <MainTable game={game} extractor={extractor} />}
    </Fragment>
  );
}

export default App;
