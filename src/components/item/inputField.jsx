import React from "react";

const InputField = ({ id, label, type, placeholder, value, onChange, required,name }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default InputField;