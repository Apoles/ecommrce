const CartItem = ({ item, onRemove, onIncrement, onDecrement }) => (
  <div className='flex items-center justify-between p-4   border-b shadow-sm max-sm:flex-col max-sm:items-center max-sm:justify-center   '>
    <img src={item.image} alt={item.title} className='sm:w-44  sm:h-32 h-52 w-full  object-cover rounded-xl ' />
    <div className='flex-1 max-sm:w-full  sm:pl-5 max-sm:pt-4  '>
      <h3 className='font-semibold'>{item.title}</h3>
      <p>{item.description}</p>
      <p className='sm:mt-4 max-sm:mb-4 '>{item.price} $ </p>
    </div>
    <div className='flex items-center space-x-2    '>
      <button onClick={onDecrement} className='px-2 py-1 bg-gray-200'>
        -
      </button>
      <span>{item.quantity}</span>
      <button onClick={onIncrement} className='px-2 py-1 bg-gray-200'>
        +
      </button>
      <button onClick={onRemove} className='px-2 py-1 bg-red-500 text-white'>
        Remove
      </button>
    </div>
  </div>
);

export default CartItem;
