import React, { useState } from 'react';
import styles from "./Manager.module.scss"
import close from "../../assets/close.svg"
const SelectProject = ({user,execute_function,setShow}) => {
  const projects = JSON.parse(user.project_assigned) || [];
  const [selectedProject,setSelectedProject]=useState(null)
  console.log(projects.length)
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    execute_function(user.manager_id,project)
    setShow(false)
  };

  return (
    <div className={styles.selectProject}>
              
     <div className={styles.head}>
     <h2>Select a Project</h2>
     <div className={styles.closeBtn} onClick={()=>{setShow(false)}}><img src={close} alt="Close Button"/></div>
      </div> 
      {projects.length >0 ? 
      <ul>
        {projects.map((project, index) => (
          <li key={index} onClick={() => handleProjectSelect(project)}>
            {project}
          </li>
        ))}
      </ul>
      :<p>No Projects</p>
}
      {/* <button onClick={()=>{execute_function(user.manager_id,selectedProject)}} disabled={projects.len>0?false : true}>Proceed</button> */}
    </div>
  );
};

export default SelectProject;
