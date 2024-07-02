import React, { useEffect, useState } from 'react'
import { FetchAllProjectEmployees } from '../../apis/Project'
import styles from "./Project.module.scss"
import close from "../../assets/close.svg"
import Delete from '../../Components/Operations/Delete'
import deleteIcon from "../../assets/delete.svg"
export default function ProjectEmployees({title,project_id,setShow,unassign_user}) {
    const [data,setData] = useState([])
    const id = title + "_id"
    useEffect(() => {
        FetchAllProjectEmployees(project_id).then(async(response) => {
            if (!response.ok) {
                let alert_data = response.status;
                const data = await response.json();
                alert_data += " : "
                alert_data += data.message;
                alert(alert_data)
            }
            else {
                const data = await response.json();
                setData(data['result'][title+"s"])
            }
        })
    }, [])
    return (
        <div className={styles.users}>
            <div className={styles.title}>
                <p>{title.toUpperCase()}S</p>
                <div className={styles.closeBtn} onClick={()=>{setShow(false)}}><img src={close} alt="Close Button"/></div>
            </div>
            <div className={styles.user}>
            {
                data && data.map((item,index)=>{
                    return(
                        <div className={styles.list}>
                        <p key={index}>{item[id]}</p>
                       <div onClick={()=>{unassign_user(item[id],project_id)}}>
                        <img src={deleteIcon} alt="Unasign User"/>
                       </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
