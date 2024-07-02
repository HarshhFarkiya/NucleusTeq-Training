import React from 'react'
import styles from "./Operations.module.scss"
import assign from "../../assets/assign.svg"
import unassign from "../../assets/unassign.svg"
import edit from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg"
import close from "../../assets/close.svg"
import { DeleteEmployee, UnassignEmployee } from '../../apis/Employee';
export default function Operations({ setOperation, id, assigned }) {
    const delete_employee = () => {
        DeleteEmployee(id).then(async (response) => {
            if (response.status != 200) {
                let alert_data = response.status;
                const data = await response.json();
                alert_data += " : "
                alert_data += data.message;
                alert(alert_data)
            }
            else {
                const data = await response.json();
                alert(data.message)
            }
        })
    }

    const unassign_employee = () => {
        if (!assigned) {
            alert("Employee is not assigned to any project")
            return;
        }
        UnassignEmployee(id).then(async (response) => {
            if (response.status != 200) {
                let alert_data = response.status;
                const data = await response.json();
                alert_data += " : "
                alert_data += data.message;
                alert(alert_data)
            }
            else {
                const data = await response.json();
                console.log(data)
                alert(data.message)
            }
        })

    }
    return (
        <div className={styles.operations} >
            <div className={styles.delete} onClick={delete_employee}>
                <img src={deleteIcon} alt="Delete User" />
            </div>
            <div className={styles.edit}>
                <img src={edit} alt="Edit User" />

            </div>
            <div className={styles.assign}>

                <img src={assign} alt="Assign User" />
            </div>
            <div className={styles.unassign} onClick={unassign_employee}>
                <img src={unassign} alt="Unassign User" />

            </div>
            <div className={styles.close} onClick={() => { setOperation(false) }}>
                <img src={close} alt="Close Options" />

            </div>
        </div>
    )
}
