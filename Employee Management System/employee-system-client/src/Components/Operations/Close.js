import React from 'react'
import styles from "./Operations.module.scss"
import close from "../../assets/close.svg"
export default function Close({setOperation}) {
    return (
        <div className={styles.close} onClick={() => { setOperation(false) }}>
            <img src={close} alt="Close Options" />

        </div>
    )
}
