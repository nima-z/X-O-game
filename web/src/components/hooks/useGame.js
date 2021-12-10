import { useEffect, useState } from "react";

let ws;
let playerId;
export default function useGame() {
  const [isPlay, setIsPlay] = useState(false);
  const [notify, setNotify] = useState(null);
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function joinGame(nickname) {
    const requestBody = { type: "join-game", playerId, nickname };
    ws.send(JSON.stringify(requestBody));
  }

  function play(cellId) {
    if (game.isFinished) return;
    ws.send(
      JSON.stringify({
        type: "play",
        playerId: playerId,
        cellId,
        gameId: game.id,
      })
    );
  }

  function resign() {
    ws.send(JSON.stringify({ type: "resign", playerId, gameId: game.id }));
  }

  function rematch() {
    const requestBody = { type: "rematch", playerId, gameId: game.id };
    ws.send(JSON.stringify(requestBody));
  }

  useEffect(() => {
    if (!ws) ws = new WebSocket("ws://localhost:8080");

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
      : game && game.isFinished && game.wonBy === playerId
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
