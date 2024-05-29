import { StarIcon } from '@heroicons/react/24/solid';

const Rating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

  return (
    <div className='flex items-center'>
      {[...Array(filledStars)].map((_, i) => (
        <StarIcon key={`filled-${i}`} className='w-6 h-6 text-black' />
      ))}
      {halfStar && <StarIcon className='w-6 h-6 text-black opacity-50 ' />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className='w-6 h-6 text-gray-200' />
      ))}
    </div>
  );
};

export default Rating;
