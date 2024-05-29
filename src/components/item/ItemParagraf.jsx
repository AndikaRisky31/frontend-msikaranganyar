import React from "react";
import { splitTextByNewLine } from "../../utils/helper";

const ListParagraf = ({ content }) => {
    const Text = splitTextByNewLine(content);

    return (
        <div style={{ fontFamily: 'PT Serif, serif' }}>
            {Text.map((item, index) => (
                <p key={index} className="py-2 md:py-3 text-justify">{`\t${item}`}</p>
            ))}
        </div>
    );
};

export default ListParagraf;