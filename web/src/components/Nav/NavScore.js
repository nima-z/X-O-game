import XScore from "./Svg/x-score";
import OScore from "./Svg/o-score";
import EqualScore from "./Svg/equal-score";

import ScoreHolder from "./ScoreHolder";

import styles from "./NavScore.module.css";

function NavScore({ players }) {
  let oNickname;
  let xNickname;
  for (let key in players) {
    if (players[key].action === "o") oNickname = players[key].nickname;
    else xNickname = players[key].nickname;
  }
  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        <OScore />
        <span className={styles.tooltip}>{oNickname}</span>
        <ScoreHolder>10</ScoreHolder>
      </div>
      <div className={styles.score}>
        <EqualScore />
        <ScoreHolder>6</ScoreHolder>
      </div>
      <div className={styles.score}>
        <XScore />
        <span className={styles.tooltip}>{xNickname}</span>
        <ScoreHolder>2</ScoreHolder>
      </div>
    </div>
  );
}

export default NavScore;
