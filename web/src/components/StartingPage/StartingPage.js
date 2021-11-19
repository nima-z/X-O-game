import { useRef } from "react";
import Button from "../UI/Button";
import styles from "./StartingPage.module.css";

function StartingPage(props) {
  const ref = useRef();

  function submitHandler(event) {
    event.preventDefault();
    props.startAction(ref.current.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="nickName">Nick Name</label>
          <input type="text" id="nickName" ref={ref} autoFocus />
          <div className={styles.action}>
            <Button type="submit">Play</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartingPage;
