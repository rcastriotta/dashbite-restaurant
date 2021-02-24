import React, { useEffect, useState } from 'react';
import styles from './NavBar.module.css';
import { BiBookReader, BiPowerOff } from 'react-icons/bi';
import { IoMdQrScanner } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { BsCollectionPlayFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom'
import { auth } from '../../../api/config';


const NavBar = () => {
    const history = useHistory()
    const [active, setActive] = useState(null)
    const links = [
        { name: 'Menus', href: '/menus', icon: <BiBookReader size={20} color={active === '/menus' ? 'white' : '#4E60FF'} /> },
        { name: 'QR Code', href: '/my-qrcode', icon: <IoMdQrScanner size={18} color={active === '/my-qrcode' ? 'white' : '#4E60FF'} /> },
        { name: 'Settings', href: '/settings', icon: <FiSettings size={18} color={active === '/settings' ? 'white' : '#4E60FF'} /> },
        { name: 'Guides', href: '/guides', icon: <BsCollectionPlayFill size={18} color={active === '/guides' ? 'white' : '#4E60FF'} /> },
    ]

    useEffect(() => {
        setActive(window.location.pathname)
    }, [])

    const buttonClickHandler = (e, href) => {
        e.preventDefault()
        history.replace(href)
        setActive(href)
    }

    return (
        <div className={styles.NavBar}>
            <div className={styles.Content}>
                <h4>Dashbite.io</h4>
                <div className={styles.ItemsContainer}>
                    {links.map(link => {
                        const isActive = link.href === active

                        let buttonStyle = `${styles.ItemSquare}`

                        if (isActive) {
                            buttonStyle = `${styles.ItemSquare} ${styles.Active}`
                        }

                        return (
                            <div className={styles.Item} key={link.href}>
                                <a href={link.href} onClick={(e) => buttonClickHandler(e, link.href)} className={buttonStyle}>{link.icon}</a>
                                <span style={isActive ? { color: '#4E60FF' } : null}>{link.name}</span>
                            </div>
                        )
                    })}
                </div>
                <button className={styles.Logout} onClick={() => auth.signOut()}>
                    <BiPowerOff size={20} />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    )
}

export default NavBar;