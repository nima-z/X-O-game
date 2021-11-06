import styles from "./NavScore.module.css";

function NavScore() {
  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        <div>O</div>
        <div>5</div>
      </div>
      <div className={styles.score}>
        <div>TIE</div>
        <div>4</div>
      </div>
      <div className={styles.score}>
        <div>X</div>
        <div>6</div>
      </div>
    </div>
  );
}

export default NavScore;
