import { useEffect, useRef, useState } from "react";

let ws;
// let playerId;
export default function useGame() {
  const [isPlay, setIsPlay] = useState(false);
  const [notify, setNotify] = useState(null);
  const [game, setGame] = useState(null);
  const [isFinished, setFinished] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const player = useRef({ id: null, nickname: "" });

  function joinGame(nickname) {
    if (!player.current.nickname) player.current.nickname = nickname;
    setIsLoading(true);
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
    if (!ws) ws = new WebSocket("ws://192.168.1.8:8080");

    ws.onmessage = function (message) {
      const response = JSON.parse(message.data);
      if (response.type === "join-server") {
        player.current.id = response.playerId;
      }

      if (response.type === "join-game") {
        console.log(response);
        const { isGameStarted } = response;
        if (!isGameStarted) {
          setGame(null);
          setNotify("Waiting for opponent...");
        } else setIsPlay(true);
      }

      if (response.type === "update-game") {
        setFinished(false);

        const gameObj = {
          ...response.game,
          isTurn: response.game.players[player.current.id].isTurn,
        };

        setGame((game) => ({ ...game, ...gameObj }));
      }

      if (response.type === "end-game") {
        console.log(response);
        const { wonBy } = response;

        setFinished(true);
        setNotify(null);
        const result = !wonBy
          ? "Draw!"
          : wonBy.playerId === player.current.id
          ? "You Won!"
          : "You Lost!";
        setGameResult(result);
      }

      if (response.type === "notify") {
        console.log({ response });
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
  };
}
