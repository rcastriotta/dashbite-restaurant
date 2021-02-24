import React from 'react';
import styles from './Alert.module.css';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri'
import { FaInfoCircle } from 'react-icons/fa';
import { auth } from '../../../api/config';

const AlertTemplate = ({ options, message, close }) => {

    let style;

    if (auth.currentUser) {
        style = { marginLeft: '180px' }
    }


    const msg = message.replace('Error: ', '')
    let classes = `${styles.Alert}`
    let icon;
    let closeButtonColor;

    if (options.type === 'success') {
        classes = `${styles.Alert} ${styles.Success}`
        icon = (<IoMdCheckmarkCircle size={18} color={'green'} style={{ marginRight: '10px' }} />)
        closeButtonColor = 'green'
    } else if (options.type === 'error') {
        classes = `${styles.Alert} ${styles.Error}`
        icon = (<RiCloseCircleFill size={18} color={'red'} style={{ marginRight: '10px' }} />)
        closeButtonColor = 'red'
    } else if (options.type === 'info') {
        classes = `${styles.Alert} ${styles.Info}`
        icon = (<FaInfoCircle size={18} color={'#2694EA'} style={{ marginRight: '10px' }} />)
        closeButtonColor = '#2694EA'
    }


    return (
        <div className={classes} style={style}>
            {icon}
            <p>
                {msg}
            </p>
            <button onClick={close} className={styles.CloseButton}><MdClose size={20} style={{ color: closeButtonColor }} /></button>
        </div>

    )
}

export default AlertTemplate;