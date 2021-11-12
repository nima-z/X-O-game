import React, { Fragment } from "react";
import xImage from "../../Icons/board/x-image.svg";
import oImage from "../../Icons/board/o-image.svg";
import styles from "./Cell.module.css";
import useSound from "use-sound";
import beep from "../../sounds/beep.wav"

function Cell(props) {
  const play = useSound(beep)[0]
  function clickHandler() {
    play()
    props.transportToUp(props.children);
  }

  let image;

  if (props.item.player) {
    if (props.item.player.action === "x") {
      image = <img src={xImage} />;
    } else if (props.item.player.action === "o") {
      image = <img src={oImage} />;
    } else {
      image = null;
    }
  }

  return (
    <Fragment>
      <td className={styles.cell} onClick={props.isTurn ? clickHandler : null}>
        {image}
      </td>
    </Fragment>
  );
}

export default Cell;
