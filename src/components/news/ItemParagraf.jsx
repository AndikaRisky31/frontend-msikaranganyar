import React from "react";
import { splitTextByNewLine } from "../helper";

const ListParagraf = ({ content }) => {
    const Text = splitTextByNewLine(content);

    return (
        <div>
            {Text.map((item, index) => (
                <p key={index} className="text-justify py-3 md:py-4">{`\t${item}`}</p>
            ))}
        </div>
    );
};

export default ListParagraf;
