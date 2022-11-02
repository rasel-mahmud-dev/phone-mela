import React, {useEffect, useState} from 'react';

const UseWindowResize = () => {
    const [width, setWidth] = useState(window.innerWidth)
    
    function handleResize(){
        setWidth(window.innerWidth)
    }
    
    useEffect(()=>{
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    
    return width;
};

export default UseWindowResize;