import Button from "../UI/Button";
import styles from "./NavOption.module.css";

function NavOption() {
  return (
    <div className={styles.options}>
      <div className={styles.actions}>
        <Button></Button>
        <p>One Player</p>
      </div>
      <div className={styles.actions}>
        <Button></Button>
        <p>Sound Off</p>
      </div>
      <div className={styles.actions}>
        <Button></Button>
        <p>Reset Game</p>
      </div>
      <div className={styles.actions}>
        <Button></Button>
        <p>Fullscreen</p>
      </div>
    </div>
  );
}

export default NavOption;
