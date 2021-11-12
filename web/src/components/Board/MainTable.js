import Board from "./Board";
import NavOption from "../Nav/NavOption";
import NavScore from "../Nav/NavScore";

import styles from "./MainTable.module.css";

function MainTable({ game, extractor }) {
  return (
    <div className={styles.container}>
      <div className="boardAndScore">
        <Board game={game} extractor={extractor} />
        <NavScore />
      </div>
      <div className={styles.options}>
        <NavOption />
      </div>
    </div>
  );
}

export default MainTable;
