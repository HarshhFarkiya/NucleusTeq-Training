import React from 'react'
import styles from "./Login.module.scss"
import { useState } from 'react'
import { Authenticate } from '../../apis/Login';
import {setSessionVariable} from "../Session"
import { useNavigate } from "react-router-dom";
import ProgressBar from "../progressbar/ProgressBar";

const initial = { UserId: "", password: "" };
export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState(initial);
    const [wait,setWait] = useState(false)
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(credentials.UserId.length === 0 || credentials.password.length ===0){
            alert("All Fields are required");
            return;
        }
        setWait(true);
        // setCredentials(initial);
        const response = await Authenticate(credentials.UserId,credentials.password);
        setWait(false)
        if(!response){
            alert("Internal Server Error")
            return;
        }
        if(response.status === 401){
            alert("Wrong Password, Try Again")
            setCredentials(initial)
        }
        else if(response.status === 404){
            alert("Invalid User Id");
            setCredentials(initial)
        }
        else if(response.status === 500){
            alert("Something Went Wrong, Try Again")
        }
        else{
            const data = await response.json();
            setSessionVariable("token",data.token,30);
            setSessionVariable("id",data.user_id,30);
            setSessionVariable("role",data.role,30);
            const role = data.role;
            if(role==="admin"){
            navigate("/admin");
            }
            else if(role==="employee"){
                navigate("/employee")
            }
            else if(role==="manager"){
                navigate("/manager")
            }
            else{
                alert("Unknown User Role")
            }
        }
        setWait(false)
    }
    return (
        <div className={styles.head}>
          {wait&& <ProgressBar/>}
        
          <div className={styles.login}>
            <h3>Login</h3>
            <form className={styles.form}>
                <div className={styles.inputs}>
                <input placeholder='User Id(email id)' name='UserId' type="email" onChange={handleChange} value={credentials.UserId} />
                <input placeholder='Password' name='password' type="password" onChange={handleChange} value={credentials.password} />
                </div>
                <div className={styles.button}>
               {<button type='Submit' onClick={handleSubmit}>Login</button>}
                </div>
            </form>
        </div>
        
      </div>
       

    )
}
