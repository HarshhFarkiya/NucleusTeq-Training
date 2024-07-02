import React, { useEffect, useState } from 'react'
import List from "../../Components/List/List"
import { FetchAllEmployees, DeleteEmployee } from '../../apis/Employee'
import ProgressBar from '../../Components/progressbar/ProgressBar'
import styles from "./Employees.module.scss"
import AddEmployeeForm from './AddEmployeeForm'
import add from "../../assets/add.svg"
import Delete from '../../Components/Operations/Delete'
import { useNavigate} from "react-router-dom";

const Employees = ({refetch, setRefetch}) => {
  const [employee_data, setData] = useState([])
  const [form, setForm] = useState(false)
  const navigate = useNavigate()
  const [fetch,setFetch]=useState(false)
  useEffect(() => {
    setFetch(true);
    FetchAllEmployees().then(async (response) => {
      if (!response.ok) {
        alert("Unauthorized Access/ Session Expired")
        sessionStorage.clear()
        setFetch(false);
        navigate("/")
      } else {
        response.json().then((temp) => {
          setData(temp.result);
          setFetch(false);
        });
      }
    })
  }, [refetch])

  return (
    <div className={styles.employees}>
      <p>Employees Section</p>
      <div className={styles.functions}>
        <div className={styles.add}>
          <div onClick={() => { setForm(true) }} className={styles.circle}><img src={add} /></div>{form && <AddEmployeeForm setForm={setForm} setRefetch={setRefetch} refetch={refetch}/>}
        </div>
        <div className={styles.delete}>
          <div className={styles.circle}><Delete DeleteFunction={DeleteEmployee} isNecessary={true} setRefetch={setRefetch} refetch={refetch}/></div>
        </div>
      </div>
      {!fetch ? <List data={employee_data} setRefetch={setRefetch} refetch={refetch}/> : <ProgressBar />}
    </div>
  )
}
export default Employees;
