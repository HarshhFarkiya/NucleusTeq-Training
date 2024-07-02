import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from "../Components/Menu/Menu"
import manager from "../assets/groupicon.svg"
import Employees from './Employees/Employees'
import Manager from './Manager/Manager'
import Profile from './Profile/Profile'
import { getSessionVariable } from "../Components/Session";
import { FetchEmployee } from '../apis/Employee'
import styles from "./Employee.module.scss"
import profile from "../assets/profile.svg"
import ProjectAssigned from './ProjectAssigned/ProjectAssigned'
import project from "../assets/course.svg"
export default function Employee() {
  const [employee, setEmployee] = useState(null);
  const [newSkills, setNewSkills] = useState('');
  const token = getSessionVariable("token");
  const [section,changeSection]=useState("profile")
  const sidebar_data = [{"title":"Profile", "link":"profile","icon":profile},{"title":"Project Assigned", "link":"project","icon":project},{"title":"Employees", "link":"employees","icon":manager},{"title":"Managers", "link":"managers","icon":manager}]
  const sidebar_element_change={"employees":<Employees/>,"managers":<Manager/>,"profile":<Profile employee={employee} setEmployee={setEmployee} newSkills={newSkills} setNewSkills={setNewSkills}/>,"project":<ProjectAssigned employee={employee}/>}

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      alert("Session expired")
      navigate("/");
    }
    FetchEmployee().then(async (response) => {
      if (response.status !== 200) {
        let alert_data = response.status;
        const data = await response.json();
        alert_data += " : "
        alert_data += data.message;
        alert(alert_data)
      }
      else {
        const data = await response.json();
        setEmployee(data.result[0])
        setNewSkills(data.result[0].employee_skills)
      }
    })
  }, [])

  return (
    <div className={styles.admin}>
    <div>
    <Menu items={sidebar_data} changeSection={changeSection} section={section}/>
    </div>
    <div>
    {
      sidebar_element_change[section]
    }
    </div>
  </div>
  )
}
