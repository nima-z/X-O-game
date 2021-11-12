import useSetting from "../../context/setting-context";
import Button from "../UI/Button";
import styles from "./NavOption.module.css";

function NavOption() {
  const { sound, toggleSound } = useSetting();

  return (
    <div className={styles.options}>
      <div className={`${styles.actions} ${styles.uiMode}`}>
        <Button onClick={toggleSound} />
        <p>Dark mode</p>
      </div>
      <div className={`${styles.actions} ${styles.sound}`}>
        <Button onClick={() => toggleSound((state) => !state)} />
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
