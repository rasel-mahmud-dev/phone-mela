import React, { FC, ReactNode } from "react";

import "./sidebar.scss";

interface Props {
    children: ReactNode;
    isOpenSidebar: boolean;
    onClose: () => void;
    className?: string;
    header?: () => ReactNode;
}

const Sidebar: FC<Props> = (props) => {
    const { children, isOpenSidebar, onClose, className = "", header } = props;
    return (
        <>
            {isOpenSidebar && <div className="sidebar_backdrop" onClick={onClose} />}
            <div className={`sidebar ${className} ${isOpenSidebar ? "open-sidebar" : "close-sidebar"}`}>
                {header && header()}

                <div className="sidebar_content">{children}</div>
            </div>
        </>
    );
};

export default Sidebar;