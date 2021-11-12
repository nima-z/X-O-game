import XScore from "./Svg/x-score";
import OScore from "./Svg/o-score";
import EqualScore from "./Svg/equal-score";

import ScoreHolder from "./ScoreHolder";

import styles from "./NavScore.module.css";

function NavScore() {
  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        <OScore />
        <ScoreHolder>10</ScoreHolder>
      </div>
      <div className={styles.score}>
        <EqualScore />
        <ScoreHolder>6</ScoreHolder>
      </div>
      <div className={styles.score}>
        <XScore />
        <ScoreHolder>2</ScoreHolder>
      </div>
    </div>
  );
}

export default NavScore;
