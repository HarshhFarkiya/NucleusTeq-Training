import React, { useEffect, useState } from "react";
import styles from "../../Components/List/List.module.scss";
const List = ({ data }) => {
  const [openRow, setOpenRow] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  // Step 2: Handle the change event
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const val = event.target.value;
    const results = [];
    if (data) {
      for (const item of data) {
        console.log(item)
        if(val==="assigned" && item.project_assigned && item.project_assigned.length > 0){
          results.push(item)
        }
        else if(val==="unassigned" && (!item.project_assigned || item.project_assigned.length ===0)){
          results.push(item)
        }
        else if(val==="all" || !val){
          results.push(item)
        }
      }
    }
    setSearchResults(results);
  };
  const toggleOperations = (index) => {
    setOpenRow(openRow === index ? null : index);
  };
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    handleSearch(query);
  };
  const handleSearch = (query) => {
    const results = [];
    if (data) {
      for (const item of data) {
        if (
          item.employee_skills.toLowerCase().includes(query)
        ) {
          if(selectedOption=='' || selectedOption==='all')
          {
            results.push(item);
          }
          else if(item.project_assigned.length===0 && selectedOption==="unassigned")
          {
            results.push(item);
          }
          else if(item.project_assigned.length!==0 && selectedOption==="assigned"){
            results.push(item);

          }
        }
      }
    }
    setSearchResults(results);
  };
  return (
    <>
     <div className={styles.searchbarContainer}>
        <form className={styles.searchForm}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by skill"
            value={searchQuery}
            onChange={handleInputChange}
          />
          
        </form>
      <div className={styles.radio}>
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedOption === 'all'}
            onChange={handleChange}
          />
          All
        </label>
      </div>
      <div className={styles.radio}>
        <label>
          <input
            type="radio"
            value="assigned"
            checked={selectedOption === 'assigned'}
            onChange={handleChange}
          />
          Assigned
        </label>
      </div>
      <div className={styles.radio}>
        <label>
          <input
            type="radio"
            value="unassigned"
            checked={selectedOption === 'unassigned'}
            onChange={handleChange}
          />
          Unassigned
        </label>
      </div>
      </div>
      {searchResults && (
        <div className={styles.details}>
          <div className={styles.list}>
            <div className={styles.head}>
              <span className={styles.id}>User id</span>
              <span className={styles.name}>Name</span>
              <span className={styles.email}>Email</span>
              <span className={styles.phone}>Phone</span>
              <span className={styles.exp}>Experience(Years)</span>
              <span className={styles.skills}>Skills</span>
              <span className={styles.status}>Project Assigned</span>
            </div>
            <div className={styles.table}>
              {searchResults.map((item, index) => (
                
                <div
                  className={styles.row}
                  key={index}
                  onClick={() => toggleOperations(index)}
                >
                  <span className={styles.id}>
                    {item.employee_id || "Not Available"}
                  </span>
                  <span className={styles.name}>
                    {item.employee_name || "Not Available"}
                  </span>
                  <span className={styles.email}>
                    {item.employee_email || "Not Available"}
                  </span>
                  <span className={styles.phone}>
                    {item.employee_phone || "Not Available"}
                  </span>
                  <span className={styles.exp}>
                    {item.employee_expereince || "Not Available"}
                  </span>
                  <span className={styles.skills}>
                    {item.employee_skills || "Not Available"}
                  </span>
                  <span className={styles.status}>
                    {item.project_assigned || "Not Assigned"}
                  </span>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
