import styles from "./ScoreHolder.module.css";

function ScoreHolder(props) {
  return <div className={styles.holder}>{props.children}</div>;
}

export default ScoreHolder;
