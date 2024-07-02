import React,{useState,useEffect} from 'react'
import { FetchAllProjects,DeleteProject } from '../../apis/Project'
import { useNavigate } from 'react-router-dom'
import List from './List'
import styles from "./Project.module.scss"
import add from "../../assets/add.svg"
import Delete from '../../Components/Operations/Delete'
import AddProjectForm from './AddProjectForm'
export default function Project({refetch, setRefetch}) {
  const [data,setData]=useState([])
  const [form,setForm]=useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    FetchAllProjects().then(async (response) => {
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
  }, [refetch])
  return (
    <div className={styles.projects}>
      <div className={styles.head}>Project Section</div>
      <div className={styles.functions}>
        <div className={styles.add}>
          <div onClick={() => { setForm(true) }} className={styles.circle}><img src={add} /></div>{form && <AddProjectForm setForm={setForm} />}
        </div>
        <div className={styles.delete}>
          <div className={styles.circle}><Delete DeleteFunction={DeleteProject} isNecessary={true} setRefetch={setRefetch} refetch={refetch}/></div>
        </div>
        </div>
      <List data={data}/>
    </div>
  )
}
