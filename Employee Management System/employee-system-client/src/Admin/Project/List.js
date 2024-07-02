import React, { useState } from "react";
import styles from "../../Components/List/List.module.scss";
import Operations from "../../Admin/Manager/Operations";
import ProjectEmployees from "./ProjectEmployees";
import { UnassignManager } from "../../apis/Manager";
import { UnassignEmployee } from "../../apis/Employee";

const List = ({ data }) => {
  const [openRow, setOpenRow] = useState(null);
  const [show, setShow] = useState(null);
  const [show_emp, setShowEmp] = useState(null);

  const toggleOperations = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const toggleManagerSection = (index) => {
    setShow(show === index ? null : index);
  };

  const toggleEmployeeSection = (index) => {
    setShowEmp(show_emp === index ? null : index);
  };

  const unassign_manager = async (user_id, project_id) => {
    UnassignManager(project_id, user_id).then(async (response) => {
      if (response.status != 200) {
        let alert_data = response.status;
        const data = await response.json();
        alert_data += " : ";
        alert_data += data.message;
        alert(alert_data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    });
  };

  const unassign_employee = async (project_id, user_id) => {
    UnassignEmployee(project_id, user_id).then(async (response) => {
      if (response.status != 200) {
        let alert_data = response.status;
        const data = await response.json();
        alert_data += " : ";
        alert_data += data.message;
        alert(alert_data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    });
  };

  return (
    <>
      {data && (
        <div className={styles.details}>
          <div className={styles.list}>
            <div className={styles.head}>
              <span className={styles.id}>Project id</span>
              <span className={styles.name}>Project Name</span>
              <span className={styles.email}>Required Skills</span>
              <span className={styles.phone}>Assigned Managers</span>
              <span className={styles.status}>Assigned Employees</span>
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
                    {item.project_name || "Not Available"}
                  </span>
                  <span className={styles.email}>
                    {item.project_skills || "Not Available"}
                  </span>
                  <span className={styles.phone}>
                    <p onClick={() => toggleManagerSection(index)}>
                      Show All Managers
                    </p>
                    {show === index && (
                      <ProjectEmployees
                        title={"manager"}
                        project_id={item.project_id}
                        setShow={setShow}
                        unassign_user={unassign_manager}
                      />
                    )}
                  </span>
                  <span className={styles.phone}>
                    <p onClick={() => toggleEmployeeSection(index)}>
                      Show All Employees
                    </p>
                    {show_emp === index && (
                      <ProjectEmployees
                        title={"employee"}
                        project_id={item.project_id}
                        setShow={setShowEmp}
                        unassign_user={unassign_employee}
                      />
                    )}
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
