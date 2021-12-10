import { v4 as uuidv4 } from "uuid";
import Board from "./Board.js";

export default function Game({ id, players, board, count }) {
  return {
    id: id ? id : uuidv4(),
    players: players ? players : {},
    board: board ? board : Board(),
    isFinished: false,
    status: 0,
    wonBy: null,
    winnerCells: null,
    count: count ? count : 0,
    winConditions: [
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
