function InitialBoardData() {
  let board = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push({ id: i * 3 + j, player: null });
    }
    board.push(row);
  }
  return board;
}

export default InitialBoardData;
