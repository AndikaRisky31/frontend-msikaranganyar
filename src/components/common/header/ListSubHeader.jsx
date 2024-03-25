import React from "react";
import { Link } from "react-router-dom";

const ListSubHeader = ({title,to}) => {
    return(
        <>
        <Link className="text-white font-semibold block hover:text-blue-600 m-4" to={to}>{title}</Link>
        </>
    )
}
export default ListSubHeader;