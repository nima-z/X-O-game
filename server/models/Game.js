import { v4 as uuidv4 } from "uuid";
import Board from "./Board.js";

export default function Game({ id, players, board }) {
  return {
    id: id ? id : uuidv4(),
    players: players ? players : {},
    board: board ? board : Board(),
  };
}
