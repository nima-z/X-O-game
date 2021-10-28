import Row from "./Row";

import styles from "./Board.module.css";

function Board({ game, extractor, action }) {
  function contentTransporter(content) {
    extractor(content);
  }

  function onCellClick(cell) {
    if (cell.playerId) return;

    // setBoard((board) => {
    //   for (let i = 0; i < board.length; i++) {
    //     for (let j = 0; j < board.length; i++) {
    //       if (board[i][j].id === cell.id) {
    //         board[i][j] = { ...board[i][j], playerId: playerId };
    //       }
    //     }
    //   }
    // });
  }

  return (
    <table className={styles.board}>
      <tbody>
        {game.board.map((row, index) => (
          <Row
            boardRow={row}
            transportToBoard={contentTransporter}
            key={index}
            action={action}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Board;
