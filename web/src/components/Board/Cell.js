import React, { useState, Fragment } from 'react';

// import IconX from '..Icons/IconX';
import IconO from '../Icons/IconO';

import styles from './Cell.module.css';

function Cell(props) {
    const [choosed, setChoosed] = useState(false);

    function clickHandler() {
        setChoosed(true)
        props.transportToUp(props.children)
    }

    return (
        <Fragment>
            {!choosed && <td className={styles.cell} onClick={clickHandler} ></td>}
            {choosed && <td className={styles.cell} onClick={clickHandler} >

                    <IconO />

            </td>}
        </Fragment>
    )
}

export default Cell;