import React, { Fragment } from "react";
import useSetting from "../../context/setting-context";
import styles from "./Cell.module.css";

function Cell(props) {
  if (props.sound) props.sound();

  return (
    <Fragment>
      <td
        className={styles.cell}
        onClick={props.isTurn ? props.transportToUp : null}
      >
        <div className={styles.holder}>
          <img src={props.image} />
        </div>
      </td>
    </Fragment>
  );
}

export default Cell;
