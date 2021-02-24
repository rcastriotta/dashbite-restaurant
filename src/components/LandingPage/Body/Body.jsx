import React from 'react';
import styles from './Body.module.css';
import Form from '../Form/Form';
import vid from '../../../assets/LandingPage/vid.mp4'
import visibility from '../../../assets/LandingPage/visibility.png';
import connect from '../../../assets/LandingPage/connect.png';
import happy from '../../../assets/LandingPage/happy.png';
import phone from '../../../assets/LandingPage/phone.png';
import qr from '../../../assets/LandingPage/qr.png';
const Body = () => {


    return (
        <div style={{ overflow: 'hidden' }}>

            <div className={styles.BackgroundImg}>
                <div className={styles.TopContainer}>
                    <div className={styles.TitleTextContainer}>
                        <h1>Make your restaurant allergy friendly.</h1>
                        <span>Join an allergy aware community.</span>
                    </div>

                    <Form />
                </div>

            </div>
            <div className={styles.Curve} />

            <div className={styles.WhatIs}>
                <div className={styles.Line} />
                <h2 >What is Dashbite?</h2>

                <div className={styles.InfoContainer}>
                    <div className={styles.VidContainer}>
                        <video src={vid} controls className={styles.Vid} />
                    </div>

                    <div style={{ width: '300px' }}>
                        <p>This video will give you an overview of our service, along with share some tips and tricks.</p>
                    </div>
                </div>
            </div>

            <div className={styles.CanDo}>
                <h2>Here's what we can do for you.</h2>

                <div className={styles.InfoContainer}>

                    <div className={styles.Item}>
                        <div className={styles.ImgContainer}>
                            <img src={visibility} alt="visibility" />
                        </div>
                        <span>Boost your visibility.</span>
                        <p>Become part of a large network of
                        allergy-friendly restaurants. With over 32
                        million Americans with food allergies,
                        people are always looking for restaurants.
                        </p>
                    </div>

                    <div className={styles.Item}>
                        <div className={styles.ImgContainer}>
                            <img src={connect} alt="connect" style={{ width: '100%' }} />
                        </div>
                        <span>Connect with customers.</span>
                        <p>Become part of a large network of
                        allergy-friendly restaurants. With over 32
                        million Americans with food allergies,
                        people are always looking for restaurants.
                        </p>
                    </div>

                    <div className={styles.Item}>
                        <div className={styles.ImgContainer}>
                            <img src={happy} alt="happy" />
                        </div>
                        <span>Improve reviews.</span>
                        <p>Become part of a large network of
                        allergy-friendly restaurants. With over 32
                        million Americans with food allergies,
                        people are always looking for restaurants.
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.TryIt}>
                <div className={styles.InfoContainer}>
                    <div>
                        <h2 style={{ color: 'black' }}>Try it for yourself.</h2>
                        <p>Take out your phone and scan the QR code. Yes, it's that simple.</p>
                        <div style={{ height: '250px', marginTop: '50px' }}>
                            <img style={{ height: '100%' }} src={phone} alt="phone" />
                        </div>
                    </div>

                    <div className={styles.Square}>
                        <img src={qr} alt="QR Code" style={{ height: '100%' }} />
                    </div>
                </div>

            </div>

            <div className={styles.BottomMsg}>
                <div className={styles.TextContainer}>
                    <h2>Join a community looking to create a world
                    where having allergies comes with
                    no limitation.</h2>
                </div>
                <button className={styles.BottomButton} onClick={() => window.scrollTo(0, 0)}>Get Started</button>

            </div>
        </div>
    )
}

export default Body;