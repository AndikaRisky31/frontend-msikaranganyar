import React from "react";
import { splitTextByNewLine } from "./helper";

const ListPlace = ({ dataListPlace }) => {
    const Data = splitTextByNewLine(dataListPlace);

    return (
        <div>
            {Data.map((item, index) => (
                <div className="flex" key={index}>
                    <p className="text-lg"><i className="fas fa-map-marker-alt pr-2"></i>{item}</p>
                </div>
            ))}
        </div>
    );
};

export default ListPlace;