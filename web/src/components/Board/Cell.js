import React, { Fragment } from "react";
import xImage from "../../assets/board/x-image.svg";
import oImage from "../../assets/board/o-image.svg";
import styles from "./Cell.module.css";
import useSound from "use-sound";
import xSound from "../../assets/sounds/x-sound.wav";
import oSound from "../../assets/sounds/o-sound.wav";

function Cell(props) {
  const x_sound = useSound(xSound, { volume: 0.6 })[0];
  const o_sound = useSound(oSound, { volume: 0.6 })[0];

  function clickHandler() {
    props.transportToUp(props.children);
  }

  let image;

  if (props.item.player) {
    if (props.item.player.action === "x") {
      image = <img src={xImage} />;
      x_sound();
    } else if (props.item.player.action === "o") {
      image = <img src={oImage} />;
      o_sound();
    } else {
      image = null;
    }
  }

  return (
    <Fragment>
      <td className={styles.cell} onClick={props.isTurn ? clickHandler : null}>
        <div className={styles.holder}>{image}</div>
      </td>
    </Fragment>
  );
}

export default Cell;
