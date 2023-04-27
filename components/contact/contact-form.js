import { useState, useEffect } from 'react';

import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const ContactForm = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const [requestStatus, setRequestStatus] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setErrorMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    const sendMessageHandler = async (e) => {
        e.preventDefault();

        setRequestStatus('pending');

        if (
            enteredEmail.trim() === '' ||
            enteredName.trim() === '' ||
            enteredMessage.trim() === ''
        ) {
            return;
        }

        const bodyData = {
            email: enteredEmail,
            name: enteredName,
            message: enteredMessage,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            setRequestStatus('success');
            setEnteredEmail('');
            setEnteredName('');
            setEnteredMessage('');
        } catch (error) {
            setRequestStatus('error');
            setErrorMessage(error.message);
        }
    };

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    }
    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!',
        };
    }
    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Faild!',
            message: errorMessage,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input
                            type='email'
                            id='email'
                            required
                            value={enteredEmail}
                            onChange={(e) => setEnteredEmail(e.target.value)}
                        />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            required
                            value={enteredName}
                            onChange={(e) => setEnteredName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        rows={5}
                        value={enteredMessage}
                        onChange={(e) => setEnteredMessage(e.target.value)}
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button type='submit'>Send Message</button>
                </div>
            </form>
            {requestStatus && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
};

export default ContactForm;
