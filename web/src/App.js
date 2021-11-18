import React, { Fragment } from "react";

import MainTable from "./components/Board/MainTable";
import StartingPage from "./components/StartingPage/StartingPage";

import "./App.css";
import useGame from "./components/hooks/useServer";

function App() {
  const { game, isLoading, isPlay, joinGame, play } = useGame();

  if (game && game.isFinished) {
    if (game.wonBy) {
      alert(`${game.wonBy} won the game with these cells: ${game.winnerCells}`);
    } else {
      alert("draw");
    }
  }

  function startGameHandler(nickname) {
    joinGame(nickname);
  }

  function extractor(cell) {
    play(cell.id);
  }

  return (
    <Fragment>
      {!isPlay && <StartingPage startAction={startGameHandler} />}
      {isLoading && <p className="loadingText">Waiting for the Opponent...</p>}
      {isPlay && <MainTable game={game} extractor={extractor} />}
    </Fragment>
  );
}

export default App;
