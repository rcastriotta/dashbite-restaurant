import React, { useCallback, useEffect } from 'react';
import styles from './Header.module.css'
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory()
    const changeHeaderStyle = useCallback(() => {
        const el = document.getElementById('Header')
        const el2 = document.getElementById('CoName')
        const el3 = document.getElementById('ForRes')
        const button = document.getElementById('Login')
        if (window.scrollY <= 0) {
            el.style.backgroundColor = '#4E60FF'
            el2.style.color = 'white'
            el3.style.color = 'white'
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            button.style.color = 'white'
        } else {
            el.style.backgroundColor = 'white'
            el2.style.color = '#4E60FF'
            el3.style.color = 'black'
            button.style.backgroundColor = 'rgba(78, 96, 255, .2)'
            button.style.color = '#4E60FF'
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', changeHeaderStyle)
        return () => {
            window.removeEventListener('scroll', changeHeaderStyle)
        }
    }, [changeHeaderStyle])

    return (
        <nav id="Header" className={styles.Header}>
            <div className={styles.ContentContainer}>

                <div className={styles.PageTitle}>
                    <span id="CoName" className={styles.Name}>Dashbite.io</span>
                    <span id="ForRes" className={styles.ForRes}>For Restaurants</span>
                </div>
                <button id="Login" className={styles.Login} onClick={() => history.push('/login')}>Login</button>
            </div>

        </nav>
    )
}

export default Header;