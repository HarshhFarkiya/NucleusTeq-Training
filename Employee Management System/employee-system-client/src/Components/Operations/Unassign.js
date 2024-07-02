import React from 'react'
import styles from "./Operations.module.scss"
import unassign from "../../assets/unassign.svg"
export default function Unassign({ UnassignFunction, id, assigned, unassign_item }) {

    return (
        <div className={styles.unassign} onClick={() => { unassign_item && unassign_item(assigned, UnassignFunction, id) }}>
            <img src={unassign} alt="Unassign User" />

        </div>
    )
}
