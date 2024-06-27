import React from 'react';
import Rating from '../Rating';

const RatingStart = ({ rating }) => {
  return (
    <div className='flex items-center mt-4 bg-white p-1 shadow-sm rounded-lg  '>
      <input
        id='default-checkbox'
        type='checkbox'
        className='w-4 h-4 mr-3  border-gray-300 rounded focus:ring-blue-500 '
      />
      <Rating className={'w-3.5 '} rating={rating}></Rating>
    </div>
  );
};

export default RatingStart;
