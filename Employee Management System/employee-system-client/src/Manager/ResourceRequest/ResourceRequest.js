import React, { useEffect, useState } from 'react';
import styles from "../Managers.module.scss";
import Close from '../../Components/Operations/Close';
import { FetchAllEmployees } from '../../apis/Employee';
import { useNavigate } from 'react-router-dom';
import { RequestResource } from '../../apis/Resources';
export default function ResourceRequest({ closeSearch, project_id }) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [employees, setEmployees] = useState(null);
    const [employeesFiltered, setEmployeesFiltered] = useState(null);


    const request_resource = (resource_id) => {

        RequestResource(project_id, resource_id).then(async (response) => {
            if (!response) {
                alert("Something Went Wrong")
                return;
            }
            const temp = await response.json()
            alert(temp.message);

        })
    }
    const handleChange = (e) => {
        const { value } = e.target;
        setSearch(value.toLowerCase());
        const searchVal = value;
        const updatedFilteredEmployees = employees && employees.filter((emp) => {
            const skills = emp.employee_skills.split(',');
            let cnt = 0;
            for (const skill of skills) {
                if (skill.toLowerCase().includes(searchVal)) {
                    cnt++;
                }
            }
            return cnt !== 0; // Keep the employee if at least one skill matches
        });
        employees && setEmployeesFiltered(updatedFilteredEmployees);
    };

    useEffect(() => {
        FetchAllEmployees().then((response) => {
            if (!response.ok) {
                alert("Unauthorized Access/ Session Expired");
                sessionStorage.clear();
                navigate("/");
            } else {
                response.json().then((temp) => {
                    setEmployees(temp.result);
                    setEmployeesFiltered(temp.result);
                });
            }
        });
    }, []);

    return (
        <div className={styles.resourceRequest}>
            <div className={styles.head}>
                <input
                    value={search}
                    name='search'
                    placeholder='Type Skills To Filter.....'
                    onChange={handleChange}
                />
                <Close setOperation={closeSearch} />
            </div>
            <div className={styles.resources}>
                {employeesFiltered && employeesFiltered.map((item, index) => (
                    <div className={styles.resource} key={index} onClick={() => {

                        request_resource(item.employee_id);
                    }}>
                        <p>{item.employee_name}</p>
                        <p>{item.employee_skills}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
