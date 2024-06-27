import React from 'react';

const MyInput = ({ ref, id, pattern, type, name, placeholder, value, onChange, className = '', ...props }) => {
  return (
    <input
      ref={ref}
      id={id}
      pattern={pattern}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 
      ${className}`}
      {...props}
    />
  );
};

export default MyInput;
