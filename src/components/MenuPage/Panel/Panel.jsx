import React from 'react';
import styles from './Panel.module.css';

const Panel = (props) => {

    return (
        <div className={styles.Panel} style={props.style}>
            <h3>{props.title}</h3>
            {props.children}


        </div>
    )
}

export default Panel;