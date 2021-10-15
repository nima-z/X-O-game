import Row from './Row';

import styles from './Board.module.css';

const board = [
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33],
];


function Board() {
    function contentTransporter(content) {
        console.log(content);
        console.log('In Board')
    }

    return (
        <table className={styles.board}>
            <tbody>
                {board.map((row, index) =>
                    <Row
                        boardRow={row}
                        transportToBoard={contentTransporter}
                        key={index}
                    />)}
            </tbody>
        </table>
    )
}

export default Board;