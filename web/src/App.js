import React, { useState, Fragment } from 'react';

import Board from './components/Board/Board';
import Button from './components/UI/Button';

import './App.css';

function App() {

  const [isPlay, setIsPlay] = useState(false);

  function startGameHandler() {
    setIsPlay(true);
  }

  return (
    <Fragment>
      {!isPlay && <Button onClick={startGameHandler}>Play</Button>}
      {isPlay && <Board />}
    </Fragment>
  );

}

export default App;
