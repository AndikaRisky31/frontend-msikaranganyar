import React from 'react';

const SubmitButton = ({ submitting, onClick }) => {
    return (
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
            disabled={submitting}
            onClick={onClick}
        >
            {submitting && (
                <svg
                    className="animate-spin h-4 w-4 mr-3 border-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-9.082C19.4 6.346 20 8.159 20 10h4c0-3.308-1.113-6.348-2.982-8.8l-1.018 1.018z"
                    ></path>
                </svg>
            )}
            {submitting ? "Processing..." : "Submit"}
        </button>
    );
};

export default SubmitButton;