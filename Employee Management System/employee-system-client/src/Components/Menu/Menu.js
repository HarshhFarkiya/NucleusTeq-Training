import React from "react";
import styles from "./Menu.module.scss";
import logoutimg from "../../assets/logout.svg";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ items ,changeSection,section}) {
  const navigate = useNavigate();
  const Logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className={styles.head}>
      <div className={styles.elements}>
        {
          items.map((item, index) => {
            return (
              <div key={index} className={styles.element} onClick={()=>{changeSection(item.link)}} style={{borderBottom :item.link==section?"5px solid #f05829":"0px"}}>
                <img src={item.icon} alt="icon" />
                <p>{item.title}</p>
              </div>

            )
          })
        }

        <div className={styles.element} onClick={Logout} >
          <img src={logoutimg} alt="logout" />
          <p>Logout</p>

        </div>
      </div>
    </div>


  );
}
