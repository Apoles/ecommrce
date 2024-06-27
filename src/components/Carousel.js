import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const Carousel = ({ context }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Önceki slayta geçiş fonksiyonu
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? context.length - 1 : prevIndex - 1));
  };

  // Sonraki slayta geçiş fonksiyonu
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === context.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='relative w-full mx-auto px-4'>
      <div className='overflow-hidden relative'>
        {/* Slayt gösterisi */}
        <div
          className='flex transition-transform ease-out duration-500'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {context.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} className='w-full h-96 flex-shrink-0' />
          ))}
        </div>
      </div>

      {/* Sol yönlendirme ikonu */}
      <ArrowLeftIcon
        onClick={prevSlide}
        className='absolute w-9 top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100'
      />

      {/* Sağ yönlendirme ikonu */}
      <ArrowRightIcon
        onClick={nextSlide}
        className='absolute w-9 top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100'
      />
    </div>
  );
};

export default Carousel;
