import React from 'react'
import styles from "./Operations.module.scss"
import deleteIcon from "../../assets/delete.svg"

export default function Delete({ id, DeleteFunction, isNecessary,setRefetch,refetch}) {
    const delete_item = () => {

        if (isNecessary) {
            const user_id = window.prompt('Enter User Id To delete');
            id = user_id
        }
        DeleteFunction(id).then(async (response) => {
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
                setRefetch(!refetch)
            }
        })
    }
    return (
        <div className={styles.delete} onClick={delete_item}>
            <img src={deleteIcon} alt="Delete User" />
        </div>
    )
}
