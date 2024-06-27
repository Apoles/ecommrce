import React from 'react';

const MyButton = ({ text, onClick, className = '', ...props }) => {
  return (
    <button
      type='button'
      className={`${className} min-w-[200px]   px-4 py-2.5 border border-[#333] bg-[#333]  text-white hover:bg-gray-50 hover:text-black  text-sm font-semibold roundeds `}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default MyButton;
