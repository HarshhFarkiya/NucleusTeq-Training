import React, { useEffect, useState } from 'react'
import { FetchProject, FetchAllProjectEmployees } from "../../apis/Project"
import styles from "../Managers.module.scss"
import ProgressBar from '../../Components/progressbar/ProgressBar'
import ResourceRequest from '../ResourceRequest/ResourceRequest'
export default function ProjectAssigned({ employee }) {
    const [project_details, setProjectDetails] = useState(null)
    const [managers, setManagers] = useState(null)
    const [employees, setEmployees] = useState(null);
    const [fetching, setFetching] = useState(false)
    const [fetching2, setFetching2] = useState(false)
    const [request, setRequest] = useState(false);
    const [projects, setProjects] = useState(JSON.parse(employee.project_assigned))
    const [fetch, setFetch] = useState(employee.project_assigned && JSON.parse(employee.project_assigned).length > 0 ? JSON.parse(employee.project_assigned)[0] : null)
    useEffect(() => {
        if (projects && projects.length === 0) return
        setFetching(true)
        FetchProject(fetch).then(async (response) => {
            if (response.status !== 200) {
                let alert_data = response.status;
                const data = await response.json();
                alert_data += " : "
                alert_data += data.message;
                alert(alert_data)
            }
            else {
                const data = await response.json();
                setProjectDetails(data.result[0])
            }
            setFetching(false)
        })

    }, [fetch])
    useEffect(() => {
        setFetching2(true);
        project_details && FetchAllProjectEmployees(project_details.project_id).then(async (response) => {
            if (response.status !== 200) {
                let alert_data = response.status;
                const data = await response.json();
                alert_data += " : "
                alert_data += data.message;
                alert(alert_data)
            }
            else {
                const data = await response.json();
                setManagers(data.result.managers);
                setEmployees(data.result.employees);
            }
            setFetching2(false);
        })
        if (!project_details) {
            setFetching2(false);

        }
    }, [project_details])
    return (

        <div className={styles.projectsAssigned}>
            <div className={styles.menu}>
                {
                    projects && projects.map((item, index) => {
                        return (
                            <p key={index} onClick={() => { setFetch(item) }} style={{ backgroundColor: fetch === item ? "#ccc" : "transparent", borderRadius: fetch === item ? "20px" : "0px" }}>{item}</p>
                        )
                    })
                }
            </div>
            <div className={styles.project}>
                {
                    projects && projects.length !== 0 && request && <ResourceRequest closeSearch={setRequest} project_id={fetch} />
                }
                {projects && projects.length !== 0 && <div onClick={() => { setRequest(true) }} className={styles.requestButton}>Request resource</div>}
                <h3>Project Details :</h3>
                {
                    project_details ? <div><p><strong>ID:</strong> {project_details.project_id}</p>
                        <p><strong>Project Name:</strong> {project_details.project_name}</p>
                        <p><strong>SKills Required:</strong> {project_details.project_skills}</p></div> :
                        <p>Nothing To Show</p>
                }

                <div>
                    <h3>Assigned Managers :</h3>
                    {
                        fetching ? <ProgressBar /> : managers && managers.length > 0 ?
                            <div>
                                <div className={styles.user}>
                                    <p>ID</p>
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                                {managers.map((manager,index) => {
                                    return (
                                        <div className={styles.user} key={index}>
                                            <p>{manager.manager_id}</p>
                                            <p>{manager.manager_name}</p>
                                            <p>{manager.manager_phone}</p>
                                            <p>{manager.manager_email}</p>
                                        </div>
                                    )
                                })

                                }
                            </div>
                            : "Not Assigned"
                    }
                </div>
                <div>
                    <h3>Assigned Employees :</h3>
                    {
                        fetching2 ? <ProgressBar /> : employees && employees.length > 0 ?
                            <div>
                                <div className={styles.user}>
                                    <p>ID</p>
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                    <p>Skills</p>
                                </div>
                                {employees.map((employee,index) => {
                                    return (
                                        <div className={styles.user} key={index}>
                                            <p>{employee.employee_id}</p>
                                            <p>{employee.employee_name}</p>
                                            <p>{employee.employee_phone}</p>
                                            <p>{employee.employee_email}</p>
                                            <p>{employee.employee_skills}</p>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            : "Not Assigned"
                    }
                </div>
            </div>
        </div>


    )
}
