/* eslint-disable jsx-a11y/label-has-associated-control */
import Modal from "../UI/Modal";
import styles from "./GameResult.module.css";
import IconButton from "../UI/IconButton";
import { ReactComponent as resignImage } from "../../assets/nav-option/resign.svg";
import { ReactComponent as loginImage } from "../../assets/icons/Login.svg";

export default function GameResult({
  onRematch,
  notifyMsg,
  status,
  onNewGame,
}) {
  return (
    <Modal>
      <div className={styles.container}>
        <label>
          {status !== "Draw" ? "You" : ""} {`${status}!`}
        </label>
        <div className={styles.actions}>
          <IconButton image={resignImage} onClick={onRematch}>
            Rematch
          </IconButton>
          <IconButton image={loginImage} onClick={() => onNewGame()}>
            New Game
          </IconButton>
        </div>
        {notifyMsg && <p>{notifyMsg}</p>}
      </div>
    </Modal>
  );
}
