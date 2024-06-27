import React from 'react';
import Rating from '../Rating';
import RatingStart from './RatingStar';

const CategoryRating = () => {
  return (
    <div className='mx-auto flex flex-col p-3  bg-gray-50'>
      <h1>Müşteri Yorumları</h1>
      <div>
        <div className='flex items-center mt-4 bg-white p-1 shadow-sm rounded-lg  '>
          <input
            id='default-checkbox'
            type='checkbox'
            value=''
            className='w-4 h-4 mr-3  border-gray-300 rounded focus:ring-blue-500 '
          />
          <p>Tümü</p>
        </div>
      </div>
      <RatingStart rating={1}></RatingStart>
      <RatingStart rating={2}></RatingStart>
      <RatingStart rating={3}></RatingStart>
      <RatingStart rating={4}></RatingStart>
      <RatingStart rating={5}></RatingStart>
    </div>
  );
};

export default CategoryRating;
