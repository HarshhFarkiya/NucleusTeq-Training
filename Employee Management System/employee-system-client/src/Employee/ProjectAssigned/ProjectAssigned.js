import React, { useEffect, useState } from 'react'
import { FetchProject,FetchAllProjectEmployees } from "../../apis/Project"
import styles from "../Employee.module.scss"
import ProgressBar from '../../Components/progressbar/ProgressBar'
import { useNavigate } from 'react-router-dom'
import { getSessionVariable } from "../../Components/Session";
export default function ProjectAssigned({ employee }) {
    const [project_details, setProjectDetails] = useState(null)
    const [managers,setManagers]=useState(null)
    const [employees,setEmployees]=useState(null);
    const [fetching,setFetching]=useState(false)
    const [fetching2,setFetching2]=useState(false)
    const token = getSessionVariable("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
          navigate("/employee");
        }
        else {
          alert("Session expired")
          navigate("/")
        }
      }, [])
    useEffect(() => {
        setFetching(true)
        employee && FetchProject(employee.project_assigned).then(async (response) => {
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

    },[])
    useEffect(()=>{
        setFetching2(true);
        project_details && FetchAllProjectEmployees(project_details.project_id).then(async(response)=>{
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
        if(!project_details){
            setFetching2(false);

        }
    },[project_details])
    return (
        <div>
            <div>
                <h3>Project Details :</h3>
                {
                    project_details ? <div><p><strong>ID:</strong> {project_details.project_id}</p>
                <p><strong>Project Name:</strong> {project_details.project_name}</p>
                <p><strong>SKills Required:</strong> {project_details.project_skills}</p></div> :
                        <p>Nothing To Show</p>
                }
            </div>
            <div>
                <h3>Assigned Managers :</h3>
                {
                    fetching ? <ProgressBar/> : managers && managers.length >0 ? managers.map((manager,index)=>{
                        return(
                           <div className={styles.user} key={index}>
                            <p>{manager.manager_id}</p>
                            <p>{manager.manager_name}</p>
                            <p>{manager.manager_phone}</p>
                            <p>{manager.manager_email}</p>
                           </div>
                        )
                    }):"Not Assigned"
                }
            </div>
            <div>
                <h3>Assigned Employees :</h3>
                {
                    fetching2 ? <ProgressBar/> : employees && employees.length >0 ? employees.map((employee,index)=>{
                        return(
                           <div className={styles.user} key={index}>
                            <p>{employee.employee_id}</p>
                            <p>{employee.employee_name}</p>
                            <p>{employee.employee_phone}</p>
                            <p>{employee.employee_email}</p>
                            <p>{employee.employee_skills}</p>
                           </div>
                        )
                    }):"Not Assigned"
                }
            </div>
        </div>
    )
}
