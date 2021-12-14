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
          <label htmlFor="nickName">Enter your name!</label>
          <div className={styles["input-wrapper"]}>
            <input
              type="text"
              id="nickName"
              ref={ref}
              autoFocus
              spellCheck={false}
            />
          </div>
        </form>
      </div>
      {props.isLoading && (
        <p className="loadingText">Waiting for the Opponent...</p>
      )}
    </Modal>
  );
}

export default StartingPage;
