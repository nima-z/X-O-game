import XScore from "./Svg/x-score";
import OScore from "./Svg/o-score";
import EqualScore from "./Svg/equal-score";

import ScoreHolder from "./ScoreHolder";

import styles from "./NavScore.module.css";

function NavScore({ players, allGames }) {
  let oNickname;
  let xNickname;
  let o_turn;
  let x_turn;
  let oWins;
  let xWins;

  players.forEach((p) => {
    if (p.action === "o") {
      oNickname = p.nickname;
      o_turn = p.isTurn;
      oWins = p.wins;
    } else {
      xNickname = p.nickname;
      x_turn = p.isTurn;
      xWins = p.wins;
    }
  });

  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        <OScore isTurn={o_turn} />
        <span className={styles.tooltip}>{oNickname}</span>
        <ScoreHolder>{oWins || 0}</ScoreHolder>
      </div>
      <div className={styles.score}>
        <EqualScore />
        <ScoreHolder>{allGames - oWins - xWins || 0}</ScoreHolder>
      </div>
      <div className={styles.score}>
        <XScore isTurn={x_turn} />
        <span className={styles.tooltip}>{xNickname}</span>
        <ScoreHolder>{xWins || 0}</ScoreHolder>
      </div>
    </div>
  );
}

export default NavScore;
