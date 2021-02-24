import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
    let classes = `${styles.Input}`

    if (props.hasError) {
        classes = `${styles.Input} ${styles.Error}`
    }

    return (
        <input
            type={props.type}
            style={props.style}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={classes}
            disabled={props.disabled}
        />
    )
}

export default Input;