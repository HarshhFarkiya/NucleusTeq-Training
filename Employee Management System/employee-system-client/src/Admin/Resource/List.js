import React, { useState } from "react";
import styles from "../../Components/List/List.module.scss";
import close from "../../assets/close.svg"
import approve from "../../assets/approve.svg"
import { ApproveResourceRequest, RejectResourceRequest } from "../../apis/Resources";
import ProgressBar from "../../Components/progressbar/ProgressBar";
const List = ({ data ,refetch,setRefetch}) => {
    const [openRow, setOpenRow] = useState(null);
    
    const [submit, setSubmit] = useState(false)
    const toggleOperations = (index) => {
        setOpenRow(openRow === index ? null : index);
    };
    const approve_request = (request) => {
        setSubmit(true)
        ApproveResourceRequest(request).then(async (response) => {
            if (response.status != 200) {
                let alert_data = response.status;
                const data = await response.json();
                alert_data += " : "
                alert_data += data.message;
                setSubmit(false)
                alert(alert_data)
                setRefetch(!refetch)
            }
            else {
                const data = await response.json();
                alert(data.message)
                setSubmit(false)
            }
        })
    }
    const reject_request = (request) => {
        setSubmit(true)
        RejectResourceRequest(request).then(async (response) => {
            if (response.status != 200) {
                let alert_data = response.status;
                const data = await response.json();
                alert_data += " : "
                alert_data += data.message;
                setSubmit(false)
                alert(alert_data)
                setRefetch(!refetch)
            }
            else {
                const data = await response.json();
                alert(data.message)
                setSubmit(false)
            }
        })
    }
    return (
        <>
            {submit && <ProgressBar />}
            {data && (
                <div className={styles.details}>
                    <div className={styles.list}>
                        <div className={styles.head}>
                            <span className={styles.id}>Project id</span>
                            <span className={styles.name}>Manager Id</span>
                            <span className={styles.email}>Resource Id</span>
                            <span className={styles.phone}>Status</span>
                            <span className={styles.status}>Actions</span>
                        </div>
                        <div className={styles.table}>
                            {data.map((item, index) => (

                                <div
                                    className={styles.row}
                                    key={index}
                                    onClick={() => toggleOperations(index)}

                                >
                                    <span className={styles.id}>
                                        {item.project_id || "Not Available"}
                                    </span>
                                    <span className={styles.name}>
                                        {item.manager_id || "Not Available"}
                                    </span>
                                    <span className={styles.email}>
                                        {item.resource_id || "Not Available"}
                                    </span>
                                    <span className={styles.phone}>
                                        {item.status == -1 ? "Rejected" : item.status == 0 ? "Requested" : "Approved"}
                                    </span>
                                    <span className={styles.status}>
                                        {
                                            item.status == 0 ? (<><div onClick={() => { approve_request(item) }}><img src={approve} alt="Approve" /></div>
                                                <div onClick={() => { reject_request(item) }}><img src={close} alt="Reject" /></div></>) : <div>Not Allowed</div>
                                        }
                                    </span>



                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default List;
