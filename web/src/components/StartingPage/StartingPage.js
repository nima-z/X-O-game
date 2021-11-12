import { useState } from "react";

import Button from "../UI/Button";

import styles from "./StartingPage.module.css";

function StartingPage(props) {
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <form>
          <label htmlFor="nickName">Nick Name</label>
          <input type="text" id="nickName" />
        </form>
      </div>
      <div className={styles.action}>
        <Button onClick={props.startAction}>Play</Button>
      </div>
    </div>
  );
}

export default StartingPage;
