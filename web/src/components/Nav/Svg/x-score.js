import xLogo_color from "../../../assets/nav-score/player-x-color.svg";
import xLogo_gray from "../../../assets/nav-score/player-x.svg";

import styles from "./x-score.module.css";

function XScore(props) {
  return props.isTurn ? (
    <img src={xLogo_color} className={styles.image} />
  ) : (
    <img src={xLogo_gray} className={styles.image} />
  );
}

export default XScore;
