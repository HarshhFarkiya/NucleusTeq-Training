import React, { useState } from 'react';
import styles from '../Manager/Manager.module.scss'; // Assuming you have a SCSS module file for styling
import ProgressBar from '../../Components/progressbar/ProgressBar';
import close from "../../assets/close.svg"
import { AddProject } from '../../apis/Project';
const AddProjectForm = ({setForm}) => {
  const [formData, setFormData] = useState({
    project_name: '',
    skills_required: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting,setSubmitting] =useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, you can submit the data or perform other actions
      setSubmitting(true);
      AddProject(formData).then(async(response)=>{
        if(response.status!=200){
           let alert_data = response.status;
           const data = await response.json();
           alert_data+=" : "
           alert_data += data.message;
           alert(alert_data)

        }
        else{
            const data = await response.json();
            alert(data.message)
        }
        setSubmitting(false);
      })
      setFormData({
        project_name: '',
        skills_required: '',

      })
    }
  };

  return (
    <div className={styles.formContainer}>
        <div className={styles.closeBtn} onClick={()=>{setForm(false)}}><img src={close} alt="Close Button"/></div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input type="text" name="project_name" value={formData.project_name} onChange={handleChange} placeholder='Enter Project Name'/>
          {errors.project_name && <span className={styles.error}>{errors.project_name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Skills Required:</label>
          <input type="text" name="skills_required" value={formData.skills_required} onChange={handleChange} placeholder='Enter Skills Required(Seperated by ,)' />
          {errors.skills_required && <span className={styles.error}>{errors.skills_required}</span>}
        </div>

        <div className={styles.btn}>
        {submitting ? <ProgressBar/> :<button type="submit">Add</button>}
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
