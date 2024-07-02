import React, { useState } from 'react';
import styles from './Employees.module.scss'; // Assuming you have a SCSS module file for styling
import ProgressBar from '../../Components/progressbar/ProgressBar';
import close from "../../assets/close.svg"
const UpdateEmployeeInfo = ({ setForm, user, EditFunction }) => {
    const [formData, setFormData] = useState({
        employee_id: user.employee_id,
        name: user.employee_name,
        email: user.employee_email,
        phone: user.employee_phone,
        skills: user.employee_skills,
        experience_years: user.employee_expereince
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
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
            EditFunction(formData).then(async (response) => {
                if(!response){
                    setSubmitting(false);
                    alert("Internal Server Error")
                    return
                }
                if (response.status != 200) {
                    let alert_data = response.status;
                    const data = await response.json();
                    alert_data += " : "
                    alert_data += data.message;
                    alert(alert_data)

                }
                else {
                    const data = await response.json();
                    alert(data.message)
                }
                setSubmitting(false);
            })
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.closeBtn} onClick={() => { setForm(false) }}><img src={close} alt="Close Button"/></div>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Id:</label>
                    <input type="text" name="employee_id" value={formData.employee_id} onChange={handleChange} placeholder='Employee id' disabled={true} style={{ color: "#fff" }} />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter fullname here' />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter valid emialid' />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter phone number' />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Skills:</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder='Enter skills(seperated by ,)' />
                    {errors.skills && <span className={styles.error}>{errors.skills}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Experience:</label>
                    <input type="text" name="experience_years" value={formData.experience_years} onChange={handleChange} placeholder='Enter experience_years(Years)' />
                    {errors.experience_years && <span className={styles.error}>{errors.experience_years}</span>}
                </div>
                <div className={styles.btn}>
                    {submitting ? <ProgressBar /> : <button type="submit">Update</button>}
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployeeInfo;
