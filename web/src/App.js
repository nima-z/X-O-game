import React, { Fragment } from "react";

import MainTable from "./components/Board/MainTable";
import StartingPage from "./components/StartingPage/StartingPage";
import InitialBoardData from "./components/Board/InitialBoardData";

import "./App.css";
import useGame from "./components/hooks/useGame";

function App() {
  const { game, isLoading, isPlay, joinGame, play, resign } = useGame();

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

  const initialGameData = {
    players: {},
    board: InitialBoardData(),
  };

  return (
    <Fragment>
      {!isPlay && (
        <StartingPage startAction={startGameHandler} isLoading={isLoading} />
      )}

      <MainTable
        game={game ? game : initialGameData}
        extractor={extractor}
        onResign={resign}
      />
    </Fragment>
  );
}

export default App;
