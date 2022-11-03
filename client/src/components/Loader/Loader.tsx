import React from "react";
import { BounceLoader } from "react-spinners";

const Loader = ({title="Loading"}) => {
    return (
        <div className="flex justify-center mt-40 flex-col items-center">
            <BounceLoader size={120} color="#647eff" />
            <h1 className="font-bold mt-2">{title}...</h1>
        </div>
    );
};

export default Loader;
