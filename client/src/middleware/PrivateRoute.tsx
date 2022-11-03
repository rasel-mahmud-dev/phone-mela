import React  from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "store/index";
import Loader from "components/Loader/Loader";


const PrivateRoute = (props) => {
    const location = useLocation();
    const { auth } = useSelector((state: RootStateType)=>state.auth)
    
    if (!auth) {
        return <Loader />;
    }
    
    if (!auth) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }
    
    return props.children;
};

export default PrivateRoute;
