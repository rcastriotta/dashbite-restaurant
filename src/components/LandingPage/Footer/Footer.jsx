import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {

    return (
        <div className={styles.Footer}>
            <div className={styles.TextContainer}>
                <span style={{ color: 'gray' }}>© Dashbite Inc. All rights reserved.</span>

            </div>
        </div>
    )
}

export default Footer;