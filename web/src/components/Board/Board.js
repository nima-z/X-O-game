import Row from "./Row";
import Card from "../UI/Card";

import styles from "./Board.module.css";

function Board({ game, extractor }) {
  function contentTransporter(content) {
    extractor(content);
  }

  return (
    <Card>
      <table className={styles.board}>
        <tbody>
          {game.board.map((row, index) => (
            <Row
              boardRow={row}
              transportToBoard={contentTransporter}
              key={index}
              isTurn={game.isTurn}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default Board;
