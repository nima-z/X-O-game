import { useState } from "react";
import useSetting from "../../context/setting-context";
import Button from "../UI/Button";
import styles from "./NavOption.module.css";

function NavOption() {
  const { sound, toggleSound, darkMode, toggleDarkMode } = useSetting();

  const uiClasses = darkMode
    ? `${styles.actions} ${styles.darkMode}`
    : `${styles.actions} ${styles.lightMode}`;

  const soundClasses = sound
    ? `${styles.actions}  ${styles.soundOff}`
    : `${styles.actions}  ${styles.soundOn}`;

  console.log(styles.soundOn);
  return (
    <div className={styles.options}>
      <div className={uiClasses}>
        <Button onClick={toggleDarkMode} />
        {darkMode ? <p>Dark Mode</p> : <p>Light Mode</p>}
      </div>

      <div className={soundClasses}>
        <Button onClick={toggleSound} />
        {sound ? <p>Sound Off</p> : <p>Sound On</p>}
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
