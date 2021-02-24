import React, { useState, useEffect } from 'react';
import styles from './Form.module.css'
import Input from '../../Global/Input/Input';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useHistory } from 'react-router-dom';

const inputs = [
    { name: "name", placeholder: "Restaurant Name" },
    { name: "address", placeholder: "Restaurant Address" },
    { name: "email", placeholder: 'Email' },
    { name: "number", placeholder: 'Number' }
]
const Form = () => {
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const [formState, setFormState] = useState({
        name: {
            text: '',
            valid: false,
        },
        address: {
            valid: false,
        },
        email: {
            text: '',
            valid: false,
        },
        number: {
            text: '',
            valid: false
        },
        showErrors: false
    })

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({

        requestOptions: {
            types: ["address"]
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
        setFormState({ ...formState, showErrors: false })
    };

    const handleSelect = ({ description }) => () => {
        setValue(description, false);
        clearSuggestions();
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (

                <li key={Math.random()} onClick={handleSelect(suggestion)}>
                    <span>{main_text}</span> <small>{secondary_text}</small>
                </li>
            );
        });



    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const formTypeHandler = (event, type) => {
        const text = event.target.value;
        let valid = false;

        if (type === 'name') {
            valid = text.length > 3
        } else if (type === 'email') {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            valid = re.test(text)

        } else if (type === 'number') {
            valid = /^\d+$/.test(text) && text.length === 10
        }

        setFormState(prev => ({ ...prev, [type]: { text, valid } }))
    }

    const submitButtonHandler = (e) => {
        e.preventDefault()

        const geocodeErr = (valid) => {
            setFormState({ ...formState, address: { valid } })

            setFormState(prev => ({ ...prev, showErrors: true }))
        }

        getGeocode({ address: value })
            .then((res) => {
                if (res.length !== 1) {
                    geocodeErr(false)
                    return
                } else if (!res[0].types.includes('street_address')) {
                    geocodeErr(false)
                    return
                } else if (!formState.name.valid || !formState.email.valid || !formState.number.valid) {
                    geocodeErr(true)
                    return
                }
                getLatLng(res[0]).then(({ lat, lng }) => {
                    history.push('/verify', {
                        name: formState.name.text,
                        address: res[0].formatted_address,
                        email: formState.email.text,
                        number: formState.number.text,
                        geocode: { lat, lng },
                        waitTime: 60
                    })
                })
            })
            .catch(() => {
                geocodeErr(false)
            });
    }

    return (
        <div className={styles.Form} style={{
            transform: isLoaded ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: isLoaded ? '1' : '0',
        }}>
            <form>
                <h3 style={{ color: '#4E60FF' }}>Sign up for free</h3>
                <div className={styles.Inputs} ref={ref}>
                    {inputs.map(input => {
                        if (input.name !== 'address') {
                            return <Input
                                key={input.name}
                                value={formState[input.name].text}
                                onChange={(e) => formTypeHandler(e, input.name)}
                                hasError={!formState[input.name].valid && formState.showErrors}
                                placeholder={input.placeholder}

                            />

                        } else {
                            return (
                                <React.Fragment key={input.name}>
                                    <Input
                                        value={value}
                                        onChange={handleInput}
                                        disabled={!ready}
                                        hasError={!formState[input.name].valid && formState.showErrors}
                                        placeholder={input.placeholder}
                                    />
                                    {status === "OK" && <div className={styles.Results}>
                                        <ul>{renderSuggestions()} </ul></div>}
                                </React.Fragment>
                            )
                        }
                    })}
                </div>
                <div className={styles.ButtonContainer}>
                    <button className={styles.Submit} onClick={submitButtonHandler}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;