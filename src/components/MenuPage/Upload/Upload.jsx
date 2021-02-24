import React, { useCallback, useState } from 'react';
import styles from './Upload.module.css';
import Panel from '../Panel/Panel';
import excel from '../../../assets/MenuPage/excel.png';
import { useDropzone } from 'react-dropzone'
import { BsDownload } from 'react-icons/bs';
import { GoCloudUpload } from 'react-icons/go';
import { useAlert } from 'react-alert';
import { auth } from '../../../api/config';
import axios from 'axios';
import Loader from 'react-loader-spinner'

const Upload = () => {
    const alert = useAlert()
    const [uploadedFile, setUploadedFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 1) {
            alert.show('Too many files selected', { type: 'error' })
        } else if (acceptedFiles[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            alert.show('Invalid file format', { type: 'error' })
        } else {
            setUploadedFile(acceptedFiles[0])
        }
    }, [alert])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    let fileDropStyles = `${styles.FileDrop}`

    if (isDragActive) {
        fileDropStyles = `${styles.FileDrop} ${styles.Active}`
    }

    const uploadPressHandler = async () => {
        if (!uploadedFile) {
            alert.show('No file chosen', { type: 'error' })
            return
        }
        setIsLoading(true)
        const file = new Blob([uploadedFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const uid = new Blob([auth.currentUser.uid], { type: "text/xml" })

        var data = new FormData();

        data.append('file', file);
        data.append('uid', uid);


        const token = await auth.currentUser.getIdToken()

        await axios({
            method: 'POST',
            url: `https://us-central1-allergy-app-7655b.cloudfunctions.net/uploadMenus?token=${token}`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data
        })
            .then(() => {
                alert.show('Success', { type: 'success' })
            })
            .catch((err) => {
                alert.show(err.toString(), { type: 'error' })
            })

        setIsLoading(false)
        setUploadedFile(null)
    }

    const viewMenu = () => {
        // go to webpage
    }

    return (
        <Panel title={"Upload Menu(s)"} >
            <div className={styles.DownloadTemplate}>
                <img alt="excel" src={excel} style={{ height: '25px', marginRight: '10px' }} />
                <a href="template.xlsx" download>Download template</a>
            </div>

            <div {...getRootProps()} className={fileDropStyles}>
                <input {...getInputProps()} />


                <>
                    <BsDownload color="#1F406C" size={30} />
                    <p>Choose a file or drop it here</p>
                </>

            </div>
            <small className={styles.Requirements}>Accepted files: .xlsx only</small>



            <div className={styles.ButtonsContainer}>
                {uploadedFile && <span>{uploadedFile.name}</span>}

                <button className={`${styles.Button} ${styles.Upload}`} onClick={uploadPressHandler}>
                    {isLoading ? <Loader
                        type="TailSpin"
                        color={'white'}
                        height={30}
                        width={30}
                    /> : <>
                            <GoCloudUpload size={20} style={{ marginRight: '5px' }} />
                                        Upload
                        </>}
                </button>
                <button className={styles.Button} onClick={viewMenu}>View Menu</button>
            </div>
        </Panel>
    )
}

export default Upload;