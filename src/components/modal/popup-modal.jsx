import React from "react";
import { createPortal } from "react-dom";
import { isBrowser } from "../../utils/helper";

const PopupModal = ({
  isOpen,
  toggleModal,
  handleConfirmDelete,
  title,
  trueChoice,
  falseChoice,
}) => {
  if (!isOpen || !isBrowser()) {
    return null;
  }

  return createPortal(
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-slate-900/50 p-4"
      onClick={toggleModal}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-4 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          data-modal-hide="popup-modal"
          onClick={toggleModal}
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 text-center md:p-5">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500">{title}</h3>
          <button
            onClick={handleConfirmDelete}
            type="button"
            className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            {trueChoice}
          </button>
          <button
            data-modal-hide="popup-modal"
            onClick={toggleModal}
            type="button"
            className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
          >
            {falseChoice}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PopupModal;
