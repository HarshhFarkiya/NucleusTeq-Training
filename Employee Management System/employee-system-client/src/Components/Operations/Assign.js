import React, { useState } from 'react'
import assign from "../../assets/assign.svg"
import styles from "./Operations.module.scss"
export default function Assign({AssignFunction,id}) {
    const assign_project=()=>{
        const project_id = window.prompt('Enter Project Id');

        if(!project_id){
            alert("Project Id is required");
            return;
        }
        AssignFunction(id,project_id).then(async (response) => {
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
    return (
       <div>
         <div className={styles.assign} onClick={assign_project}>
            <img src={assign} alt="Assign User" />
        </div>
        {/* <input placeholder='Enter Project Id' name="project_id"/> */}
       </div>
    )
}
