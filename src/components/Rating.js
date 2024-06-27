import { StarIcon } from '@heroicons/react/24/solid';

const Rating = ({ rating, className }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating); // Tam dolu yıldız sayısı
  const halfStar = rating % 1 !== 0; // Yarım yıldız var mı kontrolü
  const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0); // Boş yıldız sayısı

  return (
    <div className='flex items-center'>
      {/* Dolu yıldızlar */}
      {[...Array(filledStars)].map((_, i) => (
        <StarIcon key={`filled-${i}`} className={`${className} w-6 h-6 text-black`} />
      ))}
      {/* Yarım yıldız */}
      {halfStar && <StarIcon className={`${className} w-6 h-6 text-black opacity-50`} />}
      {/* Boş yıldızlar */}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} className={`${className} w-6 h-6 text-gray-200`} />
      ))}
    </div>
  );
};

export default Rating;
