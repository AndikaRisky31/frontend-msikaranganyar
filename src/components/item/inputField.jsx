import React from "react";

const InputField = ({ id, label, type, placeholder, value, onChange, required, name, maxLength = 100, error }) => {
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
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        required={required}
        className={`bg-gray-50 border ${error ? "border-red-500" : "border-gray-300"} text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;