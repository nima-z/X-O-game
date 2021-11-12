import Button from "../UI/Button";
import styles from "./NavOption.module.css";

function NavOption() {
  return (
    <div className={styles.options}>
      <div className={`${styles.actions} ${styles.uiMode}`}>
        <Button></Button>
        <p>Dark mode</p>
      </div>
      <div className={`${styles.actions} ${styles.sound}`}>
        <Button></Button>
        <p>Sound</p>
      </div>
      <div className={`${styles.actions} ${styles.fullscreen}`}>
        <Button id="fullscreen"></Button>
        <p>Fullscreen</p>
      </div>
      <div className={`${styles.actions} ${styles.resign}`}>
        <Button id="resign"></Button>
        <p>Resign</p>
      </div>
    </div>
  );
}

export default NavOption;
