import React, { useEffect, useState } from 'react'
import { FetchAllEmployees } from '../../apis/Employee'
import { useNavigate } from 'react-router-dom'
import List from './List'
import styles from "../Employee.module.scss"
export default function Employees() {
    const [data,setData]=useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        FetchAllEmployees().then((response)=>{
            if (!response.ok) {
                alert("Unauthorized Access/ Session Expired")
                sessionStorage.clear()
                navigate("/")
              } else {
                response.json().then((temp) => {
                  setData(temp.result);
                });
              }
        })
    },[])
  return (
    <div className={styles.head}>
        <div className={styles.title}>All Employees</div>
        <List data={data}/>
    </div>
  )
}
