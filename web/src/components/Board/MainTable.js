import Board from "./Board";
import NavOption from "../Nav/NavOption";
import NavScore from "../Nav/NavScore";

import styles from "./MainTable.module.css";

function MainTable({ game, extractor, onResign, players }) {
  return (
    <div className={styles.container}>
      <div className="boardAndScore">
        <Board game={game} extractor={extractor} />
        <NavScore players={players} allGames={game.count} />
      </div>
      <div className={styles.options}>
        <NavOption onResign={onResign} />
      </div>
    </div>
  );
}

export default MainTable;
