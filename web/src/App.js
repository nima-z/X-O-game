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
    isLoading,
    isPlay,
    joinGame,
    play,
    resign,
    rematch,
    notify,
    status,
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
        <StartingPage startAction={startGameHandler} isLoading={isLoading} />
      )}

      {game && game.isFinished && (
        <GameResult
          onNewGame={startGameHandler}
          onRematch={rematch}
          status={status}
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
