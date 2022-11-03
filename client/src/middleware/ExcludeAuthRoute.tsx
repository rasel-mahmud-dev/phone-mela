import React from "react";
import { Navigate} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import {RootStateType} from "store/index";
import {useSelector} from "react-redux";

/***** logged user not access these   */
const ExcludeAuthRoute = (props) => {

	const { auth } = useSelector((state: RootStateType)=>state.auth);
	
	if (!auth) {
		return <Loader />;
	}
	
	if (auth) {
		return <Navigate to={`/`}/>;
	}
	
	return props.children;
};

export default ExcludeAuthRoute;
