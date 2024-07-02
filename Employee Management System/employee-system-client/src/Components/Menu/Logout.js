import { useNavigate } from "react-router-dom";
export function Logout(){
    localStorage.clear();
    const navigate = useNavigate();
    navigate("/");
}