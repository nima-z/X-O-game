import { useEffect, useRef, useState } from "react";

let ws;
export default function useGame() {
  const [isPlay, setIsPlay] = useState(false);
  const [notify, setNotify] = useState(null);
  const [game, setGame] = useState(null);
  const [isFinished, setFinished] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const player = useRef({ id: null, nickname: "" });
  const [players, setPlayers] = useState([]);

  function joinGame(nickname) {
    if (!player.current.nickname) player.current.nickname = nickname;
    const requestBody = {
      type: "join-game",
      playerId: player.current.id,
      nickname: player.current.nickname,
    };
    ws.send(JSON.stringify(requestBody));
  }

  function play(cellId) {
    if (isFinished) return;
    ws.send(
      JSON.stringify({
        type: "play",
        playerId: player.current.id,
        cellId,
        gameId: game.id,
      })
    );
  }

  function resign() {
    if (!game) return;
    ws.send(
      JSON.stringify({
        type: "resign",
        playerId: player.current.id,
        gameId: game.id,
      })
    );
  }

  function rematch() {
    if (!game) return;
    const requestBody = {
      type: "rematch",
      playerId: player.current.id,
      gameId: game.id,
    };
    ws.send(JSON.stringify(requestBody));
  }

  useEffect(() => {
    if (!ws) ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = function (message) {
      const response = JSON.parse(message.data);
      if (response.type === "join-server") {
        player.current.id = response.playerId;
      }

      if (response.type === "join-game") {
        const { isGameStarted } = response;
        if (!isGameStarted) {
          setGame(null);
          setNotify("Waiting for opponent...");
        } else setIsPlay(true);
      }

      if (response.type === "update-game") {
        setFinished(false);

        setGame({
          id: response.id,
          board: response.board,
          isTurn: response.isTurn === player.current.id,
          count: response.count,
        });

        setPlayers(response.players);
      }

      if (response.type === "end-game") {
        const { wonBy, isDraw, cells } = response;

        setFinished(true);
        setNotify(null);
        const result = isDraw
          ? "Draw!"
          : wonBy.id === player.current.id
          ? "You Won!"
          : "You Lost!";
        setGameResult(result);
      }

      if (response.type === "notify") {
        setNotify(response.message);
      }
    };
  }, []);

  function handleTabClosing() {
    if (!ws) return;
    const requestBody = {
      type: "leave",
      playerId: player.current.id,
      nickname: player.current.nickname,
      gameId: game.id,
    };
    ws.send(JSON.stringify(requestBody));
    ws.close();
  }

  useEffect(() => {
    window.addEventListener("unload", handleTabClosing);
    window.addEventListener("beforeunload", handleTabClosing);
    return () => {
      window.removeEventListener("unload", handleTabClosing);
      window.removeEventListener("beforeunload", handleTabClosing);
    };
  });

  return {
    game,
    isPlay,
    joinGame,
    play,
    resign,
    rematch,
    notify,
    gameResult,
    isFinished,
    players,
  };
}
