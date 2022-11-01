import React, {FC} from "react";

interface Props {
    avatar?: string
    username?: string
    className?: string
    imgClass?: string
}


const Avatar:FC<Props> = ({avatar, username, className = "", imgClass = ""}) => {
    function chooseFirstLetter(name) {
        if (!name) {
            return "";
        }
        let letterOne = name[0];
        let letterTwo = "";
        let splitName = name.split(" ");
        if (splitName.length > 1) {
            letterTwo = splitName[1][0];
        }
        return letterOne + letterTwo;
    }
    
    return (
        <div className={`${className}`}>
            {avatar ? (
                <img src={avatar} alt="" className={`rounded-full w-8 ${imgClass}`}/>
            ) : (
                <span>{chooseFirstLetter(username)}</span>
            )}
        </div>
    );
};

export default Avatar;