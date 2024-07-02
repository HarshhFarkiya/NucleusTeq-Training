import React, { useState } from 'react'
import styles from "./Admin.module.scss"
import Menu from '../Components/Menu/Menu'
import manager from "../assets/groupicon.svg"
import request from "../assets/course.svg"
import Employees from './Employee/Employees'
import Manager from './Manager/Manager'
import Project from "./Project/Project"
import Resource from './Resource/Resource'
import project from "../assets/project.svg"
import employee from "../assets/members.svg"
import { useNavigate} from "react-router-dom";
import { getSessionVariable } from "../Components/Session";
import { useEffect } from 'react';
 const Admin=()=> {
  
  const [refetch,setRefetch]=useState(false);
    const sidebar_data = [{"title":"Employees", "link":"employees","icon":manager},{"title":"Managers", "link":"managers","icon":manager},{"title":"Projects", "link":"projects","icon":project},{"title":"Requests", "link":"requests","icon":request}]
    const sidebar_element_change={"employees":<Employees refetch={refetch} setRefetch={setRefetch}/>,"managers":<Manager refetch={refetch} setRefetch={setRefetch}/>,"projects":<Project refetch={refetch} setRefetch={setRefetch}/>,"requests":<Resource refetch={refetch} setRefetch={setRefetch}/>}
    const token = getSessionVariable("token");
    const role = getSessionVariable("role");
    const navigate = useNavigate();
    const [section,changeSection]=useState("employees")
    useEffect(() => {
      if (token && role==='admin') {
        navigate("/admin");
      }
      else{
        alert("Session expired")
        navigate("/")
      }
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
export default Admin;