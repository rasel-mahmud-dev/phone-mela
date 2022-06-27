import React from "react";
import { useNavigate} from "react-router-dom";

function withNavigate(HOC){
	return function (props){
		const navigate = useNavigate()
		return <HOC {...props} navigate = {navigate} />
	}
}

export default withNavigate