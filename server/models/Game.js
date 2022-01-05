import { v4 as uuidv4 } from "uuid";
import Board from "./Board.js";

export default function Game({
  id,
  players,
  board,
  count,
  isFinished,
  wonBy,
  winnerCells,
  winConditions,
}) {
  let status = Object.keys(players || {}).reduce(
    (current, pId) => current + 1,
    0
  );
  if (status === 2) {
    status += Object.keys(players).reduce((current, pId) => {
      return players[pId].rematchRequest + current;
    }, 0);
  }

  return {
    id: id || uuidv4(),
    players: players || {},
    playerIds: Object.keys(players || {}),
    board: board || Board(),
    isFinished: isFinished || false,
    isGameStarted: status % 2 === 0,
    wonBy: wonBy || null,
    winnerCells: winnerCells || null,
    count: count || 0,
    winConditions: winConditions || [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
  };
}
