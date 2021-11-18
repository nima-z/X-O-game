import XScore from "./Svg/x-score";
import OScore from "./Svg/o-score";
import EqualScore from "./Svg/equal-score";

import ScoreHolder from "./ScoreHolder";

import styles from "./NavScore.module.css";

function NavScore({ players }) {
  let oNickname;
  let xNickname;
  let o_turn;
  let x_turn;

  for (let id in players) {
    if (players[id].action === "o") {
      oNickname = players[id].nickname;
      o_turn = players[id].isTurn;
    } else {
      xNickname = players[id].nickname;
      x_turn = players[id].isTurn;
    }
  }
  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        <OScore isTurn={o_turn} />
        <span className={styles.tooltip}>{oNickname}</span>
        <ScoreHolder>10</ScoreHolder>
      </div>
      <div className={styles.score}>
        <EqualScore />
        <ScoreHolder>6</ScoreHolder>
      </div>
      <div className={styles.score}>
        <XScore isTurn={x_turn} />
        <span className={styles.tooltip}>{xNickname}</span>
        <ScoreHolder>2</ScoreHolder>
      </div>
    </div>
  );
}

export default NavScore;
