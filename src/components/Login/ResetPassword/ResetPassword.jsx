import React, { useState } from 'react';
import Input from '../../Global/Input/Input';
import styles from './ResetPassword.module.css';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useAlert } from 'react-alert';
import { auth } from '../../../api/config';

const ResetPassword = (props) => {
    const alert = useAlert()
    const [email, setEmail] = useState({
        text: '',
        valid: false
    })

    let buttonClass = `${styles.Confirm}`
    let canSubmit = email.valid

    if (canSubmit) {
        buttonClass = `${styles.Confirm} ${styles.Active}`
    }

    const formTypeHandler = (e) => {
        const text = e.target.value;
        let valid = text.length > 3;
        setEmail({ text, valid })
    }

    const submitButtonHandler = () => {
        if (!email.valid) {
            return
        }
        auth.sendPasswordResetEmail(email.text).then(function () {
            alert.show('Email sent!', { type: 'success' })

        }).catch(function (error) {
            alert.show(error.toString(), { type: 'error' })
        });
    }

    return (
        <div className={styles.ResetPassword}>
            <button className={styles.GoBack} onClick={props.goBack}>
                <BsArrowLeftShort size={50} />
            </button>
            <h3>Reset your password</h3>
            <p>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
            <Input
                type="email"
                style={{ marginTop: '20px' }}
                value={email.text}
                onChange={(e) => formTypeHandler(e)}
                placeholder="Email" />
            <button className={buttonClass} onClick={submitButtonHandler}>Send reset link</button>
        </div>
    )
}

export default ResetPassword;