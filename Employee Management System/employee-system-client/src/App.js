import styles from "./App.module.scss"
import Login from "./Components/Login/Login";
import { useNavigate, Routes, Route } from "react-router-dom";
import { getSessionVariable } from "./Components/Session";
import Admin from "./Admin/Admin"
import Employee from "./Employee/Employee";
import { useEffect } from "react";
import Manager from "./Manager/Managers";
const App = () => {
  const token = getSessionVariable("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [])
  return (
    <div className={styles.App}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.login}>
              <div className={styles.head}>Employee Management System</div>
              <Login />
            </div>
          }
        />
        <Route
          path="/admin/*"
          element={
            <Admin />
          }
        />
        <Route
          path="/employee/*"
          element={
            <Employee />
          }
        />
        <Route
          path="/manager/*"
          element={
            <Manager />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
