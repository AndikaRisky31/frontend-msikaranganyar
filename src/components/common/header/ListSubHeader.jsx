import React from "react";
import { Link } from "react-router-dom";

const ListSubHeader = ({title,to}) => {
    return(
        <>
        <div className="group hover:bg-teal-400 p-4 text-justify">
            <Link className="text-white font-semibold block " to={to}>{title}</Link>
        </div>
        </>
    )
}
export default ListSubHeader;