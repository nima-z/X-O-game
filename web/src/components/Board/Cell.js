import React, { Fragment, memo } from "react";
import styles from "./Cell.module.css";

function Cell({ sound, transportToUp, isTurn, image }) {
  if (sound) sound();

  return (
    <Fragment>
      <td className={styles.cell} onClick={isTurn ? transportToUp : null}>
        <div className={styles.holder}>
          <img src={image} />
        </div>
      </td>
    </Fragment>
  );
}

function propsAreEqual(prev) {
  return prev.player;
}

export default memo(Cell, propsAreEqual);
