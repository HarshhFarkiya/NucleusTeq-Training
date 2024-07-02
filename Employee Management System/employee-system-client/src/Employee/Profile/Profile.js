import { useEffect } from 'react'
import { AddSkills } from '../../apis/Employee'
import React, { useState } from 'react';
import styles from './Profile.module.scss';
import { useNavigate } from 'react-router-dom'
import { getSessionVariable } from "../../Components/Session";


const Profile = ({ employee, setEmployee, newSkills, setNewSkills }) => {
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

  const handleSkillsChange = (e) => {
    setNewSkills(e.target.value);
  };

  const updateSkills = () => {
    setEmployee({ ...employee, employee_skills: newSkills });
    AddSkills(newSkills).then(async(response) => {
      if(!response){
        alert("Some Error Occured");
        return;
      }
        const res = await response.json();
        alert(res.message);
    })
  };



  return (
    <div className={styles.profileContainer}>
      <h3 className={styles.profileTitle}>Profile</h3>
      {employee &&
        <div className={styles.profileInfo}>
          <p><strong>ID:</strong> {employee.employee_id}</p>
          <p><strong>Name : </strong> {employee.employee_name}</p>
          <p><strong>Email : </strong> {employee.employee_email}</p>
          <p><strong>Phone : </strong> {employee.employee_phone}</p>
          <p><strong>Skills : </strong> {employee.employee_skills}</p>
          <p><strong>Experience : </strong> {employee.employee_expereince} years</p>
          <p><strong>Project Assigned : </strong> {employee.project_assigned || 'None'}</p>
        </div>
      }
      <div className={styles.skillsUpdate}>
        <input
          type="text"
          value={newSkills}
          onChange={handleSkillsChange}
          className={styles.input}
        />
        <button onClick={updateSkills} className={styles.button}>
          Update Skills
        </button>
      </div>
    </div>
  );
};

export default Profile;
