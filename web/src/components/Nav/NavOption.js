import { useState } from "react";
import useSetting from "../../context/setting-context";
import Button from "../UI/Button";
import styles from "./NavOption.module.css";

function NavOption({ onResign }) {
  const { sound, toggleSound, darkMode, toggleDarkMode } = useSetting();

  const uiClasses = darkMode
    ? `${styles.actions} ${styles.darkMode}`
    : `${styles.actions} ${styles.lightMode}`;

  const soundClasses = sound
    ? `${styles.actions}  ${styles.soundOn}`
    : `${styles.actions}  ${styles.soundOff}`;

  return (
    <div className={styles.options}>
      <div className={uiClasses}>
        <Button onClick={toggleDarkMode} />
        {darkMode ? <p>Dark Mode</p> : <p>Light Mode</p>}
      </div>

      <div className={soundClasses}>
        <Button onClick={toggleSound} />
        {sound ? <p>Sound On</p> : <p>Sound Off</p>}
      </div>

      <div className={`${styles.actions} ${styles.fullscreen}`}>
        <Button id="fullscreen"></Button>
        <p>Fullscreen</p>
      </div>
      <div className={`${styles.actions} ${styles.resign}`}>
        <Button id="resign" onClick={onResign}></Button>
        <p>Resign</p>
      </div>
    </div>
  );
}

export default NavOption;
