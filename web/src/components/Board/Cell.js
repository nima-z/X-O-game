import React, { Fragment } from "react";

import styles from "./Cell.module.css";

function Cell(props) {
  function clickHandler() {
    props.transportToUp(props.children);
  }
  // console.log(props);

  return (
    <Fragment>
      <td className={styles.cell} onClick={props.isTurn ? clickHandler : null}>
        {props.item.player ? props.item.player.action : ""}
      </td>
    </Fragment>
  );
}

export default Cell;
