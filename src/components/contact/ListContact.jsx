import React from "react";

const ListContact = () => {
    return (
        <>
            <span className="contact-info">
                <div className="flex justify-between">
                    <p><a href="https://wa.me/6287737897025" target="_blank" className="text-teal-500 hover:text-blue-600">Najendra</a></p>
                    <p>(+62 877-3789-7025)</p>
                </div>
                <div className="flex justify-between">
                    <p><a href="https://wa.me/6285728013090" target="_blank"className="text-teal-500 hover:text-blue-600">Efitya</a></p>
                    <p>(+62 857-2801-3090)</p>
                </div>
            </span>
        </>
    );
};

export default ListContact;