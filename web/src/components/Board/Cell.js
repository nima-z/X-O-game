import styles from './Cell.module.css';

function Cell(props) {

    function clickHandler() {
        props.transportToUp(props.children)
    }

    return (
        <td className={styles.cell} onClick={clickHandler} >
            {props.children}
        </td>
    )
}

export default Cell;