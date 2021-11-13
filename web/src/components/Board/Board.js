import Card from "../UI/Card";
import Cell from "../Board/Cell";
import styles from "./Board.module.css";
import useSound from "use-sound";
import xSound from "../../assets/sounds/x-sound.wav";
import oSound from "../../assets/sounds/o-sound.wav";
import xImage from "../../assets/board/x-image.svg";
import oImage from "../../assets/board/o-image.svg";
import useSetting from "../../context/setting-context";

function Board({ game, extractor }) {
  const x_sound = useSound(xSound, { volume: 0.6 })[0];
  const o_sound = useSound(oSound, { volume: 0.6 })[0];
  const { sound: isSound } = useSetting();

  function contentTransporter(content) {
    extractor(content);
  }

  return (
    <Card>
      <table className={styles.board}>
        <tbody>
          {game.board.map((row, index) => (
            <tr className={styles.row} key={index}>
              {row.map((cell) => {
                let image;
                let sound;
                if (cell.player) {
                  if (cell.player.action === "x") {
                    image = xImage;
                    sound = x_sound;
                  } else if (cell.player.action === "o") {
                    image = oImage;
                    sound = o_sound;
                  }
                }

                return (
                  <Cell
                    player={cell.player ? cell.player.playerId : null}
                    key={cell.id}
                    transportToUp={() => contentTransporter(cell)}
                    isTurn={game.isTurn}
                    image={image}
                    sound={isSound ? sound : null}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default Board;
