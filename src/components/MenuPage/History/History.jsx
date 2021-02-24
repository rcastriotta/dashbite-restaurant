import React, { useState, useEffect } from 'react';
import styles from './History.module.css';
import Panel from '../Panel/Panel';
import Loader from 'react-loader-spinner';
import { functions } from '../../../api/config';
import { useAlert } from 'react-alert';
import date from 'date-and-time';
import axios from 'axios';


const History = () => {
    const alert = useAlert()
    const [uploadHistory, setUploadHistory] = useState(null)


    useEffect(() => {
        // get data
        (async () => {
            const getUploadHistory = functions.httpsCallable('getUploadHistory')
            const data = await getUploadHistory().catch((err) => {
                alert.show(err.toString(), { type: 'error' })
                setUploadHistory([])
            })
            setUploadHistory(data.data.reverse())
        })();

    }, [alert])


    const toDateTime = (secs) => {
        const d = new Date(1970, 0, 1)
        d.setSeconds(secs)

        return date.format(d, 'MM/DD/YYYY h:mm')
    }

    const restoreMenu = ({ menus }) => {
        alert.show('Restore started...', { type: 'info' })
        const restoreMenu = functions.httpsCallable('restoreMenu')
        restoreMenu({ menus })
            .then(() => alert.show('Successfully restored menu!', { type: 'success' }))
            .catch((err) => alert.show(err.toString(), { type: 'error' }))
    }

    const downloadMenu = async ({ menus }) => {
        try {
            alert.show('Download started...', { type: 'info' })
            const menuIDs = menus.map(m => m.id)

            const res = await axios({
                responseType: 'blob',
                method: 'POST',
                url: 'https://us-central1-allergy-app-7655b.cloudfunctions.net/downloadMenu',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: menuIDs
            })

            const { response } = res.request
            const blob = response;
            const downloadLink = window.document.createElement('a');
            const contentTypeHeader = res.headers['content-type']
            downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
            downloadLink.download = 'test.xlsx';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            alert.show('Successfully downloaded menu!', { type: 'success' })
        } catch (err) {
            alert.show('Download failed', { type: 'error' })
        }
    }

    return (
        <Panel title={"Previous Uploads"}>
            {uploadHistory ? <ul className={styles.List}>
                {uploadHistory.map(item => {
                    const date = toDateTime(item.date._seconds)
                    return (
                        <li className={styles.Item} key={item.date._seconds}>
                            <div className={styles.ItemContent}>
                                {date}
                                <div className={styles.InputContainer}>
                                    <span onClick={() => restoreMenu(item)}>Restore</span> | <span onClick={() => downloadMenu(item)}>Download</span>
                                </div>

                            </div>
                        </li>
                    )
                })}
            </ul> : <div className={styles.Loading}>
                    <Loader
                        type="TailSpin"
                        color={'#4E60FF'}
                        height={50}
                        width={50} />
                </div>}
        </Panel>
    )
}

export default History;