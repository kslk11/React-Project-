import {  } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute=({ children })=>{
    const islogged =  useSelector((state) => state.auth.user);
    if(!islogged) {
        return <Navigate to={'/rg'}/>
    }
    return children;
}
export default ProtectedRoute;
