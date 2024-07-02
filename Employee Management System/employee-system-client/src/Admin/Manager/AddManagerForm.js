
import React, { useState } from 'react';
import styles from './Manager.module.scss'; // Assuming you have a SCSS module file for styling
import { AddManager } from '../../apis/Manager';
import ProgressBar from '../../Components/progressbar/ProgressBar';
import close from "../../assets/close.svg"
const AddManagerForm = ({setForm,setRefetch,refetch}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting,setSubmitting] =useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'phone'){
      if(!/^[0-9]+$/.test(value)){
        setErrors({...errors,[name]:"Phone Number Should be Only Digits"})
      }
      else if(value.length !=10 && value.length !=0){
        setErrors({...errors,[name]:"Phone Number Should be of 10 digits"})
      }
      else {
        setErrors({...errors,[name]:""})
      }
    }
    else if(name === 'email'){
      if(!value.endsWith('@nucleusteq.com')){
        setErrors({...errors,[name]:"Email Must ends with @nucleusteq.com"})
      }
      else{
        setErrors({...errors,[name]:""})
      }
    }
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
      if(!/^[0-9]+$/.test(formData.phone)){
        setErrors({...errors,"phone":"Phone Number Should be Only Digits"})
        return;
      }
      setSubmitting(true);
      AddManager(formData).then(async(response)=>{
        if(response.status!=200){
           let alert_data = response.status;
           const data = await response.json();
           alert_data+=" : "
           alert_data += data.message;
           alert(alert_data)

        }
        else{
            const data = await response.json();
            alert(data.message + " , Please note the password of user : "+data.password)
            setForm(false)
            setRefetch(!refetch)
        }
        setSubmitting(false);
      })
      setFormData({
        name: '',
        email: '',
        phone: ''
      })
    }
  };

  return (
    <div className={styles.formContainer}>
        <div className={styles.closeBtn} onClick={()=>{setForm(false)}}><img src={close} alt="Close Button"/></div>
      <h2>Register Manager</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter fullname here'/>
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter valid emialid' />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter phone number'/>
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
     
        <div className={styles.btn}>
        {submitting ? <ProgressBar/> :<button type="submit">Add</button>}
        </div>
      </form>
    </div>
  );
};

export default AddManagerForm;