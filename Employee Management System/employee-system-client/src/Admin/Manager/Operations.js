import React from 'react'
import Delete from '../../Components/Operations/Delete'
import Unassign from '../../Components/Operations/Unassign'
import Close from '../../Components/Operations/Close';
import Assign from '../../Components/Operations/Assign';
import { DeleteManager, AssignManager, UnassignManager } from '../../apis/Manager';
import styles from "./Manager.module.scss"
import SelectProject from './SelectProject';
import { useState } from 'react';
export default function Operations({ id, assigned, setOperation, user }) {
  const [show, setShow] = useState(false)
  function unassign_item(manager_id,project_id) {
    if (!project_id) {
      alert("Select Project Id")
      return;
  }
    UnassignManager(project_id,manager_id).then(async(response)=>{
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
    <div className={styles.operations}>
      <Delete id={id} DeleteFunction={DeleteManager} />
      <div onClick={() => { setShow(true) }} >
        <Unassign id={id} assigned={assigned} UnassignFunction={UnassignManager} />

      </div> 
      {show && <SelectProject user={user} execute_function={unassign_item} setShow={setShow}/>}
      <Assign AssignFunction={AssignManager} id={id} />
      <Close setOperation={setOperation} />
    </div>
    )
}
