import { BOARD_WIDTH } from "../Constants.js";

export default function Board() {
  let board = [];
  for (let i = 0; i < BOARD_WIDTH; i++) {
    const row = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      row.push({ id: i * BOARD_WIDTH + j, player: null });
    }
    board.push(row);
  }
  return board;
}
