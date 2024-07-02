import React, { useState } from 'react'
import styles from "./Operations.module.scss"
import edit from "../../assets/edit.svg"
import UpdateEmployeeInfo from '../../Admin/Employee/UpdateEmployee'
export default function Edit({user,EditFunction}) {
    const [formActive,setForm]=useState(false)
    const edit_item=()=>{
        setForm(true)
    }
    return (
        <>
        <div className={styles.edit} onClick={edit_item}>
            <img src={edit} alt="Edit User" />
        </div>
        {formActive && <UpdateEmployeeInfo setForm={setForm} user={user} EditFunction={EditFunction}/>}
        </>
    )
}
