import React, { Fragment } from "react";

import MainTable from "./components/Board/MainTable";
import StartingPage from "./components/StartingPage/StartingPage";
import GameResult from "./components/GameResult/GameResult";
import InitialBoardData from "./components/Board/InitialBoardData";

import "./App.css";
import useGame from "./components/hooks/useGame";

function App() {
  const {
    game,
    isFinished,
    isPlay,
    joinGame,
    play,
    resign,
    rematch,
    notify,
    gameResult,
  } = useGame();

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
        <StartingPage startAction={startGameHandler} notify={notify} />
      )}

      {isFinished && (
        <GameResult
          onNewGame={startGameHandler}
          onRematch={rematch}
          header={gameResult}
          notifyMsg={notify}
        />
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
