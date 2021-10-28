import React, { useState, Fragment } from "react";

import styles from "./Cell.module.css";

function Cell(props) {
  function clickHandler() {
    props.transportToUp(props.children);
  }

  return (
    <Fragment>
      <td className={styles.cell} onClick={clickHandler}>
        {props.action}
      </td>
    </Fragment>
  );
}

export default Cell;
