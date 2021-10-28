import Cell from "./Cell";

import styles from "./Row.module.css";

function Row(props) {
  function contentTransporter(content) {
    props.transportToBoard(content);
    console.log(props.players);
  }

  return (
    <tr className={styles.row}>
      {props.boardRow.map((cell, index) => (
        <Cell
          item={cell}
          key={index}
          transportToUp={contentTransporter}
          action={props.action}
        >
          {cell}
        </Cell>
      ))}
    </tr>
  );
}

export default Row;
