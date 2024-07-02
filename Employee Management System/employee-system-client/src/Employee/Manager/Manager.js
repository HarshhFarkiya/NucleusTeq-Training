import React,{useState,useEffect} from 'react'
import { FetchAllManagers} from '../../apis/Manager'
import { useNavigate} from "react-router-dom";
import List from './List';
import styles from "../Employee.module.scss"
export default function Manager() {
    const [manager_data, setData] = useState([])
    const navigate = useNavigate()  
    useEffect(() => {
      FetchAllManagers().then(async (response) => {
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
    }, [])
  return (
    <div className={styles.head}>
        <div className={styles.title}>All Managers</div>
        <List data={manager_data}/>
    </div>
  )
}
