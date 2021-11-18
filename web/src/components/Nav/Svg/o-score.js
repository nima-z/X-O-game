import oLogo_color from "../../../assets/nav-score/player-o-color.svg";
import oLogo_gray from "../../../assets/nav-score/player-o.svg";

import styles from "./o-score.module.css";

function OScore(props) {
  return props.isTurn ? (
    <img src={oLogo_color} className={styles.image} />
  ) : (
    <img src={oLogo_gray} className={styles.image} />
  );
}

export default OScore;
