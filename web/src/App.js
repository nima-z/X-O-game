import React, { useState, Fragment } from "react";

import Board from "./components/Board/Board";
import Button from "./components/UI/Button";

import "./App.css";

const ws = new WebSocket("ws://localhost:8080");
// let playerId = null;
let board = null;

// const requestBody = { type: "join-game", playerId: playerId }
// ws.send(JSON.stringify(requestBody)

function App() {
  const [isPlay, setIsPlay] = useState(false);
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState({ id: null, action: null });

  ws.onmessage = function (message) {
    const response = JSON.parse(message.data);
    if (response.type === "join-server") {
      setPlayer((player) => ({ ...player, id: response.playerId }));
    }

    if (response.type === "join-game") {
      setGame(response.game);
      if (response.game.players.length === 2) {
        console.log("in-game", response.game.players);
        response.game.players.forEach((p) => {
          if (p.playerId === player.id) {
            setPlayer((player) => ({ ...player, action: p.action }));
          }
        });
        setIsPlay(true);
      }
    }

    if (response.type === "update-game") {
      console.log(response);
      setGame(response.game);
    }
  };

  function startGameHandler() {
    const requestBody = { type: "join-game", playerId: player.id };
    ws.send(JSON.stringify(requestBody));
  }

  function extractor(cell) {
    ws.send(
      JSON.stringify({
        type: "play",
        playerId: player.id,
        cellId: cell.id,
        gameId: game.id,
      })
    );
  }

  return (
    <Fragment>
      {!isPlay && <Button onClick={startGameHandler}>Play</Button>}
      {isPlay && (
        <Board game={game} extractor={extractor} action={player.action} />
      )}
    </Fragment>
  );
}

export default App;
