import { useRef } from "react";

import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "./StartingPage.module.css";

function StartingPage(props) {
  const ref = useRef();

  function submitHandler(event) {
    event.preventDefault();
    props.startAction(ref.current.value);
  }

  return (
    <Modal>
      <div className={styles.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="nickName">Nick Name</label>
          <input type="text" id="nickName" ref={ref} autoFocus />
          <div className={styles.action}>
            <Button type="submit">Play</Button>
          </div>
          {props.isLoading && (
            <p className="loadingText">Waiting for the Opponent...</p>
          )}
        </form>
      </div>
    </Modal>
  );
}

export default StartingPage;
