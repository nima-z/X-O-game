import Modal from "../UI/Modal";
import styles from "./GameResult.module.css";
import IconButton from "../UI/IconButton";
import { ReactComponent as resignImage } from "../../assets/nav-option/resign.svg";
import { ReactComponent as loginImage } from "../../assets/icons/Login.svg";
import { ReactComponent as resignImageDark } from "../../assets/nav-option/resign-dark.svg";
import { ReactComponent as loginImageDark } from "../../assets/icons/login-dark.svg";
import useSetting from "../../context/setting-context";
export default function GameResult({
  onRematch,
  notifyMsg,
  header,
  onNewGame,
}) {
  const { darkMode } = useSetting();

  return (
    <Modal>
      <div className={styles.container}>
        <label>{header}</label>
        <div className={styles.actions}>
          <IconButton
            image={darkMode ? resignImageDark : resignImage}
            onClick={onRematch}
          >
            Rematch
          </IconButton>
          <IconButton
            image={darkMode ? loginImageDark : loginImage}
            onClick={() => onNewGame()}
          >
            New Game
          </IconButton>
        </div>
        {notifyMsg && <p>{notifyMsg}</p>}
      </div>
    </Modal>
  );
}
