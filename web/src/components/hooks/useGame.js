import { useEffect, useRef, useState } from "react";

let ws;
// let playerId;
export default function useGame() {
  const [isPlay, setIsPlay] = useState(false);
  const [notify, setNotify] = useState(null);
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const player = useRef({ id: null, nickname: "" });

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
    if (game.isFinished) return;
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
    ws.send(
      JSON.stringify({
        type: "resign",
        playerId: player.current.id,
        gameId: game.id,
      })
    );
  }

  function rematch() {
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
        setIsLoading(true);
        const game = {
          ...response.game,
          isTurn: response.game.players[player.current.id].isTurn,
        };

        setGame(game);
        if (Object.keys(response.game.players).length === 2) {
          setIsLoading(false);
          setIsPlay(true);
        }
      }

      if (response.type === "update-game") {
        const gameObj = {
          ...response.game,
          isTurn: response.game.players[player.current.id].isTurn,
        };

        setGame((game) => ({ ...game, ...gameObj }));
        setNotify(null);
      }

      if (response.type === "notify-rematch") {
        setNotify(`${response.name} is ready for rematch!`);
      }
    };
  }, []);

  const status =
    game && game.isFinished && !game.wonBy
      ? "Draw"
      : game && game.isFinished && game.wonBy === player.current.id
      ? "Won"
      : "Lost";

  return {
    game,
    isLoading,
    isPlay,
    joinGame,
    play,
    resign,
    rematch,
    notify,
    status,
  };
}
